import React from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Installer = Database['public']['Tables']['installers']['Row'];
type InstallerInsert = Database['public']['Tables']['installers']['Insert'];
type Quote = Database['public']['Tables']['quotes']['Row'];
type QuoteInsert = Database['public']['Tables']['quotes']['Insert'];
type ContactClick = Database['public']['Tables']['contact_clicks']['Insert'];
type AnalyticsEvent = Database['public']['Tables']['analytics_events']['Insert'];

// Installer Services
export const installerService = {
  // Get all installers with optional filters
  async getInstallers(filters?: {
    energyType?: string;
    bundesland?: string;
    searchTerm?: string;
    limit?: number;
    offset?: number;
  }) {
    // First, get the total count
    let countQuery = supabase
      .from('installers')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'active');

    if (filters?.energyType && filters.energyType !== 'all') {
      countQuery = countQuery.eq('energy_type', filters.energyType);
    }

    if (filters?.bundesland && filters.bundesland !== 'all') {
      countQuery = countQuery.ilike('location', `%${filters.bundesland}%`);
    }

    if (filters?.searchTerm) {
      countQuery = countQuery.or(`name.ilike.%${filters.searchTerm}%,description.ilike.%${filters.searchTerm}%,specialties.cs.{${filters.searchTerm}}`);
    }

    const { count, error: countError } = await countQuery;
    
    if (countError) {
      console.error('Error fetching installer count:', countError);
      throw countError;
    }

    // Then get the actual data with pagination
    let dataQuery = supabase
      .from('installers')
      .select('*')
      .eq('status', 'active')
      .order('rating', { ascending: false });

    if (filters?.energyType && filters.energyType !== 'all') {
      dataQuery = dataQuery.eq('energy_type', filters.energyType);
    }

    if (filters?.bundesland && filters.bundesland !== 'all') {
      dataQuery = dataQuery.ilike('location', `%${filters.bundesland}%`);
    }

    if (filters?.searchTerm) {
      dataQuery = dataQuery.or(`name.ilike.%${filters.searchTerm}%,description.ilike.%${filters.searchTerm}%,specialties.cs.{${filters.searchTerm}}`);
    }

    // Apply pagination
    if (filters?.limit) {
      dataQuery = dataQuery.limit(filters.limit);
    }
    if (filters?.offset) {
      dataQuery = dataQuery.range(filters.offset, filters.offset + (filters.limit || 10) - 1);
    }

    const { data, error } = await dataQuery;
    
    if (error) {
      console.error('Error fetching installers:', error);
      console.error('Error details:', {
        message: error.message,
        details: error.details,
        code: error.code,
        hint: error.hint
      });
      throw error;
    }

    return { data: data || [], totalCount: count || 0 };
  },

  // Get installer by ID
  async getInstaller(id: string) {
    const { data, error } = await supabase
      .from('installers')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching installer:', error);
      throw error;
    }

    return data;
  },

  // Add new installer
  async createInstaller(installer: InstallerInsert) {
    const { data, error } = await supabase
      .from('installers')
      .insert(installer)
      .select()
      .single();

    if (error) {
      console.error('Error creating installer:', error);
      throw error;
    }

    return data;
  }
};

// Quote Services
export const quoteService = {
  // Submit new quote request
  async submitQuote(quote: QuoteInsert) {
    const { data, error } = await supabase
      .from('quotes')
      .insert(quote)
      .select()
      .single();

    if (error) {
      console.error('Error submitting quote:', error);
      throw error;
    }

    return data;
  },

  // Get quotes for an installer
  async getInstallerQuotes(installerId: string) {
    const { data, error } = await supabase
      .from('quotes')
      .select('*')
      .eq('assigned_installer_id', installerId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching installer quotes:', error);
      throw error;
    }

    return data;
  }
};

// Analytics Services
export const analyticsService = {
  // Track contact click
  async trackContactClick(contactClick: ContactClick) {
    const { data, error } = await supabase
      .from('contact_clicks')
      .insert(contactClick);

    if (error) {
      console.error('Error tracking contact click:', error);
      // Don't throw error for analytics - just log it
    }

    return data;
  },

  // Track general analytics event
  async trackEvent(event: AnalyticsEvent) {
    const { data, error } = await supabase
      .from('analytics_events')
      .insert(event);

    if (error) {
      console.error('Error tracking analytics event:', error);
      // Don't throw error for analytics - just log it
    }

    return data;
  }
};

// Utility functions
export const dbUtils = {
  // Get user's IP address (simplified)
  async getUserIP(): Promise<string> {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch {
      return 'unknown';
    }
  },

  // Get user agent
  getUserAgent(): string {
    return navigator.userAgent;
  },

  // Generate session ID
  generateSessionId(): string {
    return 'session_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
  }
};

// Hook for getting installers with loading state
export const useInstallers = () => {
  const [installers, setInstallers] = React.useState<Installer[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const fetchInstallers = async (filters?: {
    energyType?: string;
    bundesland?: string;
    searchTerm?: string;
    limit?: number;
    offset?: number;
  }) => {
    try {
      setLoading(true);
      setError(null);
      const result = await installerService.getInstallers(filters);
      setInstallers(result.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setInstallers([]);
    } finally {
      setLoading(false);
    }
  };

  return {
    installers,
    loading,
    error,
    fetchInstallers,
    refetch: fetchInstallers
  };
};