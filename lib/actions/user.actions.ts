"use server";

import User from "@/lib/models/user.model";
import { connectToDB } from "../mongoose";
import { revalidatePath } from "next/cache";
import Thread from "../models/thread.model";
import { FilterQuery, SortOrder } from "mongoose";

interface Params {
  userId: string;
  username: string;
  name: string;
  image: string;
  bio: string;
  path: string;
}

export async function fetchUser(userId: string) {
  try {
    connectToDB();

    return await User.findOne({ id: userId });
    // .populate({
    //   path: "communities",
    //   model: Community,
    // });
  } catch (error: any) {
    throw new Error(`Failed to fetch user: ${error.message}`);
  }
}

export async function updateUser({
  userId,
  bio,
  name,
  path,
  username,
  image,
}: Params): Promise<void> {
  try {
    connectToDB();

    await User.findOneAndUpdate(
      { id: userId },
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
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}

export async function fetchUserPosts(userId: string) {
  try {
    connectToDB();
    const threads = await User.findOne({ id: userId }).populate({
      path: "threads",
      model: Thread,
      populate: {
        path: "children",
        model: Thread,
        populate: {
          path: "author",
          model: User,
          select: "name image id",
        },
      },
    });
    return threads;
  } catch (err: any) {
    throw new Error(`Error in fetching the user's posts: ${err.message}`);
  }
}


interface fetchAllUsersParams{
    userId: string;
    searchString: string;
    pageNumber: number;
    pageAmount: number;
    sortBy: SortOrder;
  }
export async function fetchAllUsers({
  userId,
  searchString = "",
  pageNumber = 1,
  pageAmount = 20,
  sortBy = "desc",
}:fetchAllUsersParams) {
  try {
    connectToDB();
    const skipAmount = (pageNumber - 1) * pageAmount;
    const regex = new RegExp(searchString, "i");
    const query:FilterQuery<typeof User>={
      id:{$ne:userId}
    }
    if(searchString.trim()!==""){
      query.$or=[
        {username:{
          $regex:regex
        }},
        {name:{
          $regex:regex
        }}
      ]
    }
    const sortOptions={createdAt:sortBy}
    const userQuery=User.find(query)
    .sort(sortOptions)
    .skip(skipAmount)
    .limit(pageAmount)

    const totalUsersCount=await User.countDocuments(query);

    const users =await userQuery.exec();
    const isNext= totalUsersCount>skipAmount*users.length;
    return{users, isNext}
  } catch (err: any) {
    console.log(`Failed to fetch the users: ${err.message}`);
  }
}
