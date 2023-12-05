"use server"

import client from "../db/dbConnection";
const collection = client.db().collection('collection');

export async function POST(formData){

const data = Object.fromEntries(formData);
console.log(data)


}