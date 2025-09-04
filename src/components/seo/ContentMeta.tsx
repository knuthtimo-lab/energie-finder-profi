/**
 * Content metadata component with visible last updated and author information
 * Supports sitemap synchronization for accurate lastmod dates
 */

import React from 'react';
import { Calendar, User, Clock } from 'lucide-react';

interface ContentMetaProps {
  lastUpdated: Date;
  authorName?: string;
  authorUrl?: string;
  publishedDate?: Date;
  readTime?: string;
  className?: string;
}

const ContentMeta: React.FC<ContentMetaProps> = ({
  lastUpdated,
  authorName = 'EnergieProfis Redaktion',
  authorUrl = 'https://energie-profis.de/team',
  publishedDate,
  readTime,
  className = ''
}) => {
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit', 
      year: 'numeric'
    });
  };

  const formatDateTime = (date: Date): string => {
    return date.toISOString();
  };

  return (
    <div className={`flex flex-wrap items-center gap-4 text-sm text-muted-foreground border-t pt-4 mt-6 ${className}`}>
      {/* Last Updated - Most important for AEO */}
      <div className="flex items-center gap-2">
        <Calendar className="w-4 h-4" />
        <span>
          <strong>Zuletzt aktualisiert:</strong>
          <time 
            dateTime={formatDateTime(lastUpdated)}
            className="ml-1 font-medium"
          >
            {formatDate(lastUpdated)}
          </time>
        </span>
      </div>

      {/* Author Information */}
      <div className="flex items-center gap-2">
        <User className="w-4 h-4" />
        <span>
          <strong>Autor:</strong>
          {authorUrl ? (
            <a 
              href={authorUrl} 
              className="ml-1 font-medium hover:text-primary transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              {authorName}
            </a>
          ) : (
            <span className="ml-1 font-medium">{authorName}</span>
          )}
        </span>
      </div>

      {/* Published Date (if different from last updated) */}
      {publishedDate && publishedDate.getTime() !== lastUpdated.getTime() && (
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span>
            <strong>Veröffentlicht:</strong>
            <time 
              dateTime={formatDateTime(publishedDate)}
              className="ml-1"
            >
              {formatDate(publishedDate)}
            </time>
          </span>
        </div>
      )}

      {/* Read Time */}
      {readTime && (
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span>{readTime} Lesezeit</span>
        </div>
      )}
    </div>
  );
};

export default ContentMeta;