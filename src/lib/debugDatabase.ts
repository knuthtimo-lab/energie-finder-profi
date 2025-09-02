import { supabase } from "@/integrations/supabase/client";

export const testConnection = async () => {
  console.log('=== TESTING SUPABASE CONNECTION ===');
  
  try {
    // Test basic connection
    const { data, error } = await supabase
      .from('installers')
      .select('count', { count: 'exact', head: true });

    if (error) {
      console.error('Connection test failed:', error);
      console.error('Error details:', {
        message: error.message,
        details: error.details,
        code: error.code,
        hint: error.hint
      });
      return false;
    }

    console.log('✅ Connection successful! Table has', data?.length || 0, 'records');
    return true;
  } catch (error) {
    console.error('Connection test exception:', error);
    return false;
  }
};

export const debugDatabase = async () => {
  console.log('=== DATABASE DEBUG ===');
  
  try {
    // Get all installers
    const { data, error } = await supabase
      .from('installers')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching installers:', error);
      return;
    }

    console.log(`Found ${data?.length || 0} installers in database:`);
    
    data?.forEach((installer, index) => {
      console.log(`\n${index + 1}. ${installer.name}`);
      console.log(`   Company: ${installer.company_name}`);
      console.log(`   Location: ${installer.location}`);
      console.log(`   Energy Type: ${installer.energy_type}`);
      console.log(`   Created: ${installer.created_at}`);
      console.log(`   ID: ${installer.id}`);
    });

    return data;
  } catch (error) {
    console.error('Debug error:', error);
  }
};

export const forceDeleteAll = async () => {
  console.log('=== FORCE DELETE ALL INSTALLERS ===');
  
  try {
    // First, let's see what's there
    const { data: allData } = await supabase
      .from('installers')
      .select('*');
    
    console.log('Records before deletion:', allData?.length || 0);
    allData?.forEach((record, index) => {
      console.log(`${index + 1}. ${record.name} (ID: ${record.id})`);
    });

    // Delete ALL records without any conditions
    const { data, error } = await supabase
      .from('installers')
      .delete()
      .not('id', 'is', null); // This will delete all records

    if (error) {
      console.error('Error in force delete:', error);
      throw error;
    }

    console.log('All installers deleted successfully');
    
    // Verify deletion
    const { data: remainingData } = await supabase
      .from('installers')
      .select('*');
    
    console.log('Records after deletion:', remainingData?.length || 0);
    
    return data;
  } catch (error) {
    console.error('Force delete error:', error);
    throw error;
  }
};