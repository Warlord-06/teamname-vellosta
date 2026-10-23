import React from 'react';
import { AlertCircle, AlertTriangle, CheckCircle2, Info, X } from 'lucide-react';

export default function StatusMessage({ type = 'info', title, message, onDismiss, action }) {
  if (!message && !title) return null;

  const icons = {
    info: <Info className="status-icon text-indigo-500" size={20} />,
    warning: <AlertTriangle className="status-icon text-amber-500" size={20} />,
    error: <AlertCircle className="status-icon text-rose-500" size={20} />,
    success: <CheckCircle2 className="status-icon text-emerald-500" size={20} />
  };

  return (
    <div className={`status-banner status-${type}`} role="alert">
      <div className="status-icon-box">
        {icons[type] || icons.info}
      </div>
      <div className="status-body">
        {title && <div className="status-title">{title}</div>}
        <div className="status-desc">{message}</div>
        {action && <div className="status-action">{action}</div>}
      </div>
      {onDismiss && (
        <button 
          type="button" 
          className="status-close-btn" 
          onClick={onDismiss} 
          aria-label="Dismiss alert"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
