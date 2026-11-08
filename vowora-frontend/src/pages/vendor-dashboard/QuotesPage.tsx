import React from 'react';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { StatusBadge } from '../../components/common/StatusBadge';
import { formatDate, formatCurrency } from '../../utils/format';
import { EmptyState } from '../../components/common/EmptyState';
import { mockData } from '../../services/mockData';
import './VendorDashboard.css';

export const QuotesPage: React.FC = () => {
  const quotes = mockData.quotes.getQuotesByVendor('user-v1');

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Quotes</h1>
        <p>View and manage quotes submitted to customers.</p>
      </div>

      <div className="page-actions">
        <Button variant="primary">Create quote</Button>
        <Button variant="secondary">View quote history</Button>
      </div>

      {quotes.length === 0 ? (
        <Card>
          <EmptyState
            title="No quotes yet"
            description="Quotes you submit to customers will appear here. Submit a quote after accepting a request."
          />
        </Card>
      ) : (
        <div className="quotes-list">
          {quotes.map((quote) => (
            <Card key={quote.id} className="quote-card">
              <div className="quote-card-header">
                <div className="quote-card-info">
                  <h3 className="quote-id">Quote #{quote.id.slice(-6).toUpperCase()}</h3>
                  <span className="quote-version">Version {quote.version}</span>
                </div>
                <StatusBadge status={quote.status} />
              </div>
              <div className="quote-items">
                {quote.items.map((item) => (
                  <div key={item.id} className="quote-item">
                    <div className="quote-item-description">
                      <span className="quote-item-qty">{item.quantity}</span>
                      <span className="quote-item-desc">{item.description}</span>
                    </div>
                    <span className="quote-item-price">
                      {formatCurrency(item.total, quote.currency)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="quote-summary">
                <div className="quote-summary-row">
                  <span>Subtotal</span>
                  <span>{formatCurrency(quote.subtotal, quote.currency)}</span>
                </div>
                {quote.tax > 0 && (
                  <div className="quote-summary-row">
                    <span>Tax</span>
                    <span>{formatCurrency(quote.tax, quote.currency)}</span>
                  </div>
                )}
                <div className="quote-summary-row quote-summary-total">
                  <span>Total</span>
                  <span>{formatCurrency(quote.total, quote.currency)}</span>
                </div>
              </div>
              <div className="quote-meta">
                <span>Valid until {formatDate(quote.validUntil)}</span>
                {quote.notes && <span className="quote-notes">{quote.notes}</span>}
              </div>
              <div className="quote-actions">
                <Button variant="secondary" size="sm">
                  Edit quote
                </Button>
                <Button variant="ghost" size="sm">
                  Duplicate
                </Button>
                <Button variant="ghost" size="sm">
                  Preview
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuotesPage;
