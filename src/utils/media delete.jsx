import { createClient } from "@supabase/supabase-js";
import toast from "react-hot-toast";

const url = "https://dunpqwhwpfitozxdjbss.supabase.co";
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR1bnBxd2h3cGZpdG96eGRqYnNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE2Mzk4OTAsImV4cCI6MjA2NzIxNTg5MH0.3PKmpSZirDbYiW_mlUa1jFEV0Nb_eAymp1JBbqUvZqs";

const supabase = createClient(url, key);

export async function deleteAllImages() {
  try {
    const { data: files, error: listError } = await supabase.storage.from("images").list();

    if (listError) {
      toast.error("Failed to list files");
      throw new Error(listError.message);
    }

    if (!files || files.length === 0) {
      toast.success("No files to delete");
      return "No files to delete";
    }

    const fileNames = files.map(file => file.name);

    const { error: deleteError } = await supabase.storage.from("images").remove(fileNames);

    if (deleteError) {
      toast.error("Failed to delete files");
      throw new Error(deleteError.message);
    }

    toast.success("All images deleted successfully");
    return "Deleted";

  } catch (error) {
    toast.error(error.message || "An error occurred");
    throw error;
  }
}
