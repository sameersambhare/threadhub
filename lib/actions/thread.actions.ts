"use server";

import { revalidatePath } from "next/cache";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";

interface Params {
  text: string;
  author: string;
  communityId: string | null;
  path: string;
}

export async function createThread({
  text,
  author,
  communityId,
  path,
}: Params) {
  try {
    connectToDB();
    const createdThread = await Thread.create({
      text,
      author,
      community: null,
    });
    await User.findByIdAndUpdate(author, {
      $push: { threads: createdThread._id },
    });
    revalidatePath(path);
  } catch (err: any) {
    throw new Error(`Error in creating the thread: ${err.message}`);
  }
}

export async function fetchPosts(pageNumber = 1, pageSize = 20) {
  try {
    //make the connection to the database
    connectToDB();
    //also implement the pagination
    const skipAmount = (pageNumber - 1) * pageSize;
    //fetch those posts that does not have any parent
    const postsQuery = await Thread.find({
      parentId: { $in: [null, undefined] },
    })
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(pageSize)
      .populate({ path: "author", model: User })
      .populate({
        path: "children",
        populate: {
          path: "author",
          model: User,
          select: "_id name parentId image ",
        },
      });

    const totalPostCounts = await Thread.countDocuments({
      parentId: { $in: [null, undefined] },
    });
    const posts = postsQuery;
    const isNext = totalPostCounts > skipAmount + posts.length;
    return { posts, isNext };
  } catch (err: any) {
    throw new Error(`Error in fetching the posts: ${err.message}`);
  }
}
