import { metadata } from "@/app/layout";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({
    image: {maxFileSize: "4MB"},
  })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("file url", file.url);
      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
}),
    variantImageUploader : f({image: {maxFileSize: "4MB",maxFileCount: 10}}
    )
    .onUploadComplete(async ({metadata,file}) =>{
      console.log("variant file url", file.url);
    })
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
