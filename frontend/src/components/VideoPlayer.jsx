import React, { useState, useEffect } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';
import './VideoPlayer.css';

const VideoPlayer = ({ url, sourceType = 'auto', poster = '', title = '' }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [type, setType] = useState('embed'); // 'youtube', 'mp4', 'embed'

  const detectSource = React.useCallback(() => {
    if (!url) {
      setError(true);
      return;
    }

    let detectedType = sourceType;

    if (sourceType === 'auto') {
      if (url.includes('youtube.com') || url.includes('youtu.be')) {
        detectedType = 'youtube';
      } else if (url.toLowerCase().endsWith('.mp4') || url.toLowerCase().includes('.mp4?')) {
        detectedType = 'mp4';
      } else if (url.trim().startsWith('<iframe')) {
        detectedType = 'embed-code';
      } else {
        detectedType = 'embed'; // fallback to iframe
      }
    }

    setType(detectedType);
  }, [url, sourceType]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    detectSource();
  }, [detectSource]);

  const getYoutubeEmbedUrl = (link) => {
    if (!link) return '';
    if (link.includes('embed/')) return link;
    
    let id = '';
    if (link.includes('v=')) {
      id = link.split('v=')[1]?.split('&')[0];
    } else if (link.includes('youtu.be/')) {
      id = link.split('youtu.be/')[1]?.split('?')[0];
    } else if (link.includes('youtube.com/shorts/')) {
      id = link.split('shorts/')[1]?.split('?')[0];
    }
    
    if (!id) return link; // Fallback to raw link if ID not found
    return `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1&autoplay=0`;
  };

  const renderPlayer = () => {
    try {
      if (type === 'youtube') {
        const embedUrl = getYoutubeEmbedUrl(url);
        return (
          <iframe
            src={embedUrl}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onLoad={() => setLoading(false)}
          />
        );
      }

      if (type === 'mp4') {
        return (
          <video
            src={url}
            controls
            poster={poster}
            className="html5-player"
            onLoadedData={() => setLoading(false)}
            onError={() => {
              setError(true);
              setLoading(false);
            }}
          >
            Sizning brauzeringiz ushbu videoni qo'llab-quvvatlamaydi.
          </video>
        );
      }

      if (type === 'embed-code') {
        // Dangerously set innerHTML for raw iframe code provided by admin
        // We trust admin input but in real projects we would sanitize this
        return (
          <div 
            className="raw-embed" 
            dangerouslySetInnerHTML={{ __html: url }}
            ref={() => setLoading(false)}
          />
        );
      }

      // Default iframe embed for any other URL (Vimeo, Dailymotion, etc)
      return (
        <iframe
          src={url}
          title={title}
          allowFullScreen
          onLoad={() => setLoading(false)}
          onError={() => {
            setError(true);
            setLoading(false);
          }}
        />
      );
    } catch (err) {
      console.error('Player error:', err);
      setError(true);
      setLoading(false);
    }
  };

  return (
    <div className="player-container">
      {loading && (
        <div className="player-loader">
          <Loader2 className="spinner" size={40} />
          <span>Yuklanmoqda...</span>
        </div>
      )}

      {error ? (
        <div className="player-error">
          <AlertCircle size={40} />
          <p>Videoni yuklashda xatolik yuz berdi.</p>
        </div>
      ) : (
        <div className={`player-wrapper ${loading ? 'hidden' : ''}`}>
          {renderPlayer()}
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
