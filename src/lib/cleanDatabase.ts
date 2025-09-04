import { supabase } from "@/integrations/supabase/client";
import { comprehensiveInstallers } from "./comprehensiveSeedData";

export const cleanAndReseedDatabase = async () => {
  console.log('Cleaning existing installer data...');
  
  try {
    // First, delete all existing installers
    const { error: deleteError } = await supabase
      .from('installers')
      .delete()
      .not('id', 'is', null); // Delete all records

    if (deleteError) {
      console.error('Error deleting existing data:', deleteError);
      throw deleteError;
    }

    console.log('Existing data cleaned successfully!');
    
    // Insert the comprehensive German installer data
    const { data, error: insertError } = await supabase
      .from('installers')
      .insert(comprehensiveInstallers)
      .select();

    if (insertError) {
      console.error('Error inserting German installer data:', insertError);
      console.error('Insert error details:', {
        message: insertError.message,
        details: insertError.details,
        code: insertError.code,
        hint: insertError.hint
      });
      throw insertError;
    }

    console.log('German installer data inserted successfully:', data?.length, 'installers added');
    return data;
    
  } catch (error) {
    console.error('Error in cleanAndReseedDatabase:', error);
    throw error;
  }
};