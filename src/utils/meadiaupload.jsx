const url = "https://dunpqwhwpfitozxdjbss.supabase.co";
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR1bnBxd2h3cGZpdG96eGRqYnNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE2Mzk4OTAsImV4cCI6MjA2NzIxNTg5MH0.3PKmpSZirDbYiW_mlUa1jFEV0Nb_eAymp1JBbqUvZqs";
import { createClient } from "@supabase/supabase-js";
import toast from "react-hot-toast";

const supabase = createClient(url, key);

export default function UploadFile(file) {
  const promise = new Promise((resolve, reject) => {
    if (file == null) {
      reject("please select a file to upload");
      toast.error("Please select a file to upload");
      return;
    }

    const timeStamp = new Date().getTime();
    const fileName = timeStamp + "-" + file.name;

    supabase.storage
      .from("images").upload(fileName, file, { cacheControl: "3600", upsert: false })
      .then((response) => {
        if (response.error) {
          reject("Failed to upload file");
          toast.error("Failed to upload file");
        } else {
          const publicUrl = supabase.storage.from("images").getPublicUrl(fileName).data.publicUrl;
          resolve(publicUrl);
        }
      })
      .catch(() => {
        reject("Failed to upload file");
        toast.error("Failed to upload file");
      });
  });

  return promise;
}
