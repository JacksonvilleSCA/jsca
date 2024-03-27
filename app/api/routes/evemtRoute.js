"use server";
import connect from "../db/dbConnection";
import Event from "../schema/Event";
import Create from "../schema/Create";
import Admin from "../schema/Admin";
import { revalidatePath } from "next/cache";
import mongoose from "mongoose";
import { redirect } from "next/navigation";
import { contact } from "./eventContact";

export async function GET() {
  let data = await Event.find({}).lean().exec();

  data.forEach((item, index) => {
    const base64Image = item.img.data.buffer.toString("base64");
    data[index].img = `data:${item.img.contentType};base64,${base64Image}`;
    item._id = item._id.toString();
    data[index]._id = data[index]._id.toString();
  });
  return data;
}

export async function getEvent(eventData) {
  let data = await Event.findOne({ _id: eventData.id }).lean().exec();

  const base64Image = data["img"].data.buffer.toString("base64");
  data["img"] = `data:${data["img"].contentType};base64,${base64Image}`;

  data["_id"] = data["_id"].toString();

  return { props: { data: JSON.parse(JSON.stringify(data)) } };
}

export async function DELETE(Data) {
  const response = await Event.deleteOne({ _id: Data.val });

  if (response) {
    console.log("ok");
  }

  revalidatePath("/Dashboard/EventHistory");
  redirect("/Dashboard/EventHistory");
}

export async function PUT(formData) {
  const data = Object.fromEntries(formData);

  const file = data.avatar;
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  let active;
  if (data.activation === "Activate") {
    active = true;
  } else {
    active = false;
  }

  let res;
  if (data.avatar.size === 0) {
    res = await Event.updateOne(
      { _id: data.event },
      {
        amount: data.totalPeople,
        event: data.eventType,
        startTime: data.startTime,
        endTime: data.endTime,
        location: data.Location,
        details: data.details,
        active: active,
      }
    );
  } else {
    res = await Event.updateOne(
      { _id: data.event },
      {
        amount: data.totalPeople,
        img: {
          data: buffer,
          contentType: file.type,
        },
        startTime: data.startTime,
        endTime: data.endTime,
        location: data.Location,
        details: data.details,
        active: active,
      }
    );
  }

  if (res) {
    console.log("ok");
  }

  revalidatePath("/Dashboard/EventHistory");
  redirect("/Dashboard/EventHistory");
}

export async function POST(formData) {
  const data = Object.fromEntries(formData);

  console.log(data.event);

  const adminID = await Admin.findOne({ adminID: data.adminID })
    .select("_id")
    .lean()
    .exec();

  const file = data.avatar;
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const res = await Event.create({
    amount: data.totalPeople,
    img: {
      data: buffer,
      contentType: file.type,
    },
    startTime: data.startTime,
    endTime: data.endTime,
    location: data.Location,
    details: data.details,
    event: data.event,
    admin: adminID,
  });

  if (res) {
    console.log("ok");
  }
  revalidatePath("/Dashboard/EventHistory");
  redirect("/Dashboard/EventHistory");
}

export async function PostWaitList(formData) {
  const eventWaitList = await Event.findOne({
    _id: formData.eventID,
    waitlist: formData.userID,
  });
  const eventApproveList = await Event.findOne({
    _id: formData.eventID,
    attendees: formData.userID,
  });

  if (eventWaitList) {
    return { Bad: "User is already in the waitlist" };
  }
  if (eventApproveList) {
    return { Bad: "User is already in the approve list" };
  }

  const res = await Event.updateOne(
    { _id: formData.eventID },
    { $push: { waitlist: formData.userID } }
  );

  if (res.acknowledged) {
    return { Good: "User has been added to wait list" };
  } else {
    console.log("Event has not been updated");
  }
}

export async function GetList(eventData) {
  const EventID = eventData.id;

  try {
    const res = await Event.findById(eventData.id).select("amount waitlist attendees");
    const resTwo = await res.populate("waitlist attendees");

    if (resTwo) {
      console.log("good");
      console.log(resTwo);

      // Convert _id to string
      if (resTwo._id) {
        resTwo._id = resTwo._id.toString();
      }

      const convertedWaitlist = resTwo.waitlist.map((item) => {
        const newItem = JSON.parse(JSON.stringify(item));
        if (newItem._id) {
          newItem._id = newItem._id.toString();
        }
        if (newItem.creates) {
          newItem.creates = newItem.creates.toString();
        }
        return newItem;
      });

      const convertedAttendees = resTwo.attendees.map((attendee) => {
        const newAttendee = JSON.parse(JSON.stringify(attendee));
        if (newAttendee._id) {
          newAttendee._id = newAttendee._id.toString();
        }
        return newAttendee;
      });

      return {
        waitlist: convertedWaitlist,
        attendees: convertedAttendees,
        eventID: EventID,
        max: res.amount
      };
    } else {
      return { waitlist: [], attendees: [] };
    }
  } catch (error) {
    return { waitlist: [], attendees: [] };
  }
}

export async function PostToAcceptanceList(Data) {
  const res = await Event.updateOne(
    { _id: Data.event },
    { $push: { attendees: Data.val } }
  );

  if (res.acknowledged) {
    const emailObject = { email: Data.email, checkStatus: Data.check };
    contact(emailObject);

    const resTwo = await Event.updateOne(
      { _id: Data.event }, // Matching criteria
      { $pull: { waitlist: Data.val } } // Adding an element to the waitlist array
    );

    if (resTwo.acknowledged) {
      console.log("Member has been removed from wait list");
    } else {
      console.log("Error has occurred removing member from wait list");
    }
  } else {
    console.log("Member has not been added to acceptance list");
  }
}

export async function DeleteFromWaitList(Data) {
  console.log("Remove from wait list");

  const res = await Event.updateOne(
    { _id: Data.event },
    { $pull: { waitlist: Data.val } }
  );

  if (res.acknowledged) {
    console.log("Member has been removed from wait list");
  } else {
    console.log("Member has been removed from wait list");
  }
}

export async function DeleteFromAcceptanceList(Data) {
  const res = await Event.updateOne(
    { _id: Data.event },
    { $pull: { attendees: Data.val } }
  );

  if (res.acknowledged) {
    console.log("Member has been removed from acceptance list");
  } else {
    console.log("Member has been removed from acceptance list");
  }
}

export async function GetMemberEvents(Data) {
  const memberInfo = await Create.findOne({ _id: Data.userID }).lean().exec();
  const eventInfo = await Event.find({ attendees: Data.userID })
    .select("_id location")
    .lean()
    .exec();

  return { memberInfo, eventInfo };
}

export async function GetMoreInfoEvent(eventData) {
  let data = await Event.findOne({ _id: eventData }).lean().exec();

  const base64Image = data["img"].data.buffer.toString("base64");
  data["img"] = `data:${data["img"].contentType};base64,${base64Image}`;

  data["_id"] = data["_id"].toString();

  return data;
}

export async function GetMemberListStatus(eventData) {
  let data;
  let res;

  if (eventData.params.exchangeID) {
    data = await Event.findOne({ _id: eventData.params.exchangeID })
      .lean()
      .exec();
    res = await Event.findById(eventData.params.exchangeID).select("admin");
  }

  if (eventData.params.id) {
    data = await Event.findOne({ _id: eventData.params.id }).lean().exec();
    res = await Event.findById(eventData.params.id).select("admin");
  }

  const adminInfo = await res.populate("admin");
  let adminEmail = adminInfo.admin.email;
  console.log(adminEmail);

  const waitListStatus = await Event.find({
    _id: eventData.params.id,
    waitlist: eventData.id,
  })
    .select("_id location")
    .lean()
    .exec();
  const approveListStatus = await Event.find({
    _id: eventData.params.id,
    attendees: eventData.id,
  })
    .select("_id location")
    .lean()
    .exec();

  const base64Image = data["img"].data.buffer.toString("base64");
  data["img"] = `data:${data["img"].contentType};base64,${base64Image}`;
  data["_id"] = data["_id"].toString();

  if (waitListStatus.length > 0) {
    return { data, adminEmail, status: "TF" };
  }
  if (approveListStatus.length > 0) {
    console.log(approveListStatus);
    console.log("approve *************************************");
    return { data, adminEmail, status: "TT" };
  } else {
    console.log("nothing *************************************");
    return { data, adminEmail, status: "FF" };
  }
}
