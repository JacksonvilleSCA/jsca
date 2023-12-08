"use server"

import connect from "../db/dbConnection";
import Form from "../schema/Form";



//const collection = client.db().collection('collection');

export async function POST(formData){

const data = Object.fromEntries(formData);
console.log(data)


}