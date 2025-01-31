"use server";

import User from "@/lib/models/user.model";
import { connectToDB } from "../mongoose";
import { revalidatePath } from "next/cache";

interface Params {
  userid: string;
  username: string;
  name: string;
  image: string;
  bio: string;
  path: string;
}

export async function updateUser({
  userid,
  username,
  name,
  image,
  bio,
  path,
}: Params): Promise<void> {
  connectToDB();
  try {
    await User.findOneAndUpdate(
      { id: userid },
      {
        username: username.toLowerCase(),
        name,
        bio,
        image,
        onboarded: true,
      },
      { upsert: true }
    );

    if (path === "/profile/edit") {
      revalidatePath(path);
    }
  } catch (error: any) {
    throw new Error(`Failed to create the user: ${error.message}`);
  }
}

export async function fetchUser(userId: string) {
  try {
    return await User.findOne({ userId })
    // .populate({
    //   path:'communities',
    //   model:Community
    // });
  } catch (err: any) {
    throw new Error(`Failed to fetch the user: ${err.message}`);
  }
}
