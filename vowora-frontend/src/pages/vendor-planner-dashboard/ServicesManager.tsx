import React, { useState } from 'react';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { StatusBadge } from '../../components/common/StatusBadge';
import { EmptyState } from '../../components/common/EmptyState';
import { mockData } from '../../services/mockData';
import './VendorPlannerDashboard.css';

export const ServicesManager: React.FC = () => {
  const services = mockData.marketplace.getVendorServices('user-v1');


  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Services</h1>
        <p>Manage your services and service categories.</p>
      </div>

      <div className="services-header-actions">
        <Button variant="primary">Add service</Button>
        <span className="services-count">{services.length} services</span>
      </div>

      {services.length === 0 ? (
        <Card>
          <EmptyState
            title="No services yet"
            description="Add services to your profile so customers can find what you offer."
            action={<Button variant="secondary">Add service</Button>}
          />
        </Card>
      ) : (
        <div className="services-list">
          {services.map((service) => (
            <Card key={service.id} className="service-card">
              <div className="service-card-header">
                <div>
                  <h3 className="service-name">{service.name}</h3>
                  <span className="service-category">{service.category}</span>
                </div>
                <div className="service-card-badges">
                  {service.basePrice && (
                    <span className="service-price">
                      {service.basePrice} {service.currency}
                    </span>
                  )}
                  <StatusBadge status={service.isAvailable ? 'available' : 'unavailable'} size="sm" />
                </div>
              </div>
              <p className="service-description">{service.description}</p>
              <div className="service-meta">
                <span>Duration: {service.duration}</span>
              </div>
              <div className="service-actions">
                <Button variant="secondary" size="sm">
                  Edit
                </Button>
                <Button variant="ghost" size="sm">
                  Archive
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServicesManager;
