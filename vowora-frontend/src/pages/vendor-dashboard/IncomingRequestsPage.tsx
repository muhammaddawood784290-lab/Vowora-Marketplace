import React, { useState } from 'react';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { StatusBadge } from '../../components/common/StatusBadge';
import { EmptyState } from '../../components/common/EmptyState';
import { mockData } from '../../services/mockData';
import { formatDate } from '../../utils/format';
import './VendorDashboard.css';

export const IncomingRequestsPage: React.FC = () => {
  const requests = mockData.vendorRequests.getRequestsByVendor('user-v1');
  const [filter, setFilter] = useState<'all' | 'pending' | 'accepted' | 'rejected' | 'countered'>('all');

  const filtered = filter === 'all' ? requests : requests.filter((r) => r.status === filter);

  const handleRespond = (requestId: string, status: string) => {
    // Placeholder
    console.log('Respond to request:', requestId, status);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Incoming requests</h1>
        <p>Respond to customer requests for your services.</p>
      </div>

      <div className="requests-filters">
        {(['all', 'pending', 'accepted', 'rejected', 'countered'] as const).map((f) => (
          <button
            key={f}
            className={`filter-chip ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
            {f === 'pending' && requests.filter((r) => r.status === 'pending').length > 0 && (
              <span className="filter-badge">
                {requests.filter((r) => r.status === 'pending').length}
              </span>
            )}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <Card>
          <EmptyState
            title={filter === 'all' ? 'No requests yet' : `No ${filter} requests`}
            description="Customer requests will appear here when they contact you through the marketplace."
          />
        </Card>
      ) : (
        <div className="requests-list">
          {filtered.map((req) => (
            <Card key={req.id} className="request-card">
              <div className="request-card-header">
                <div className="request-card-info">
                  <h3 className="request-event-name">{req.eventName}</h3>
                  <span className="request-customer">By {req.customerName}</span>
                </div>
                <StatusBadge status={req.status} />
              </div>
              <p className="request-type">{req.requestType}</p>
              {req.message && <p className="request-message">{req.message}</p>}
              <div className="request-meta">
                <span>Event date: {formatDate(req.eventDate)}</span>
                <span>Response deadline: {formatDate(req.responseDeadline)}</span>
              </div>
              <div className="request-actions">
                {req.status === 'pending' && (
                  <>
                    <Button variant="secondary" size="sm" onClick={() => handleRespond(req.id, 'accepted')}>
                      Accept
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleRespond(req.id, 'countered')}>
                      Counteroffer
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleRespond(req.id, 'rejected')}>
                      Reject
                    </Button>
                  </>
                )}
                {req.status === 'countered' && (
                  <>
                    <Button variant="secondary" size="sm">
                      Review counter
                    </Button>
                    <Button variant="ghost" size="sm">
                      Withdraw
                    </Button>
                  </>
                )}
                <Button variant="ghost" size="sm">
                  View details
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default IncomingRequestsPage;
