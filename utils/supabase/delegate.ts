import { supabase } from "./supabase"

class SupabaseDelegate {

    static uploadToStorage = async (mode: string, file: File) => {
        try {
            const fileExt = file.name.split('.').pop()
            const filePath = `${Math.random()}-${Math.random()}.${fileExt}`
            const { error: uploadError } = await supabase.storage.from('storage').upload(filePath, file)
            if (uploadError) {
                throw uploadError
            }
            return filePath;
        } catch (e) {
            console.log(`ERROR: ${e}`);
            return null;
        }
    }
}