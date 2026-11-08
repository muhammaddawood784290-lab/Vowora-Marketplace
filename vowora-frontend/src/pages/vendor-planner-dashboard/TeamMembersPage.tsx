import React from 'react';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { StatusBadge } from '../../components/common/StatusBadge';
import { EmptyState } from '../../components/common/EmptyState';
import { mockData } from '../../services/mockData';
import { formatDate } from '../../utils/format';
import './VendorPlannerDashboard.css';

export const TeamMembersPage: React.FC = () => {
  const members = mockData.teamMembers.getAllTeamMembers('user-v1', 'vendor');

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Team members</h1>
        <p>Manage your team members and their permissions.</p>
      </div>

      <div className="team-header-actions">
        <Button variant="primary">Invite team member</Button>
        <span className="team-count">
          {members.length} / {mockData.users.getVendorProfile('user-v1')?.teamMemberCount} members
        </span>
      </div>

      {members.length === 0 ? (
        <Card>
          <EmptyState
            title="No team members"
            description="Invite team members to help manage your business."
            action={<Button variant="secondary">Invite team member</Button>}
          />
        </Card>
      ) : (
        <div className="team-list">
          {members.map((member) => (
            <Card key={member.id} className="team-member-card">
              <div className="team-member-info">
                <div className="team-member-avatar">
                  {member.firstName[0]}{member.lastName[0]}
                </div>
                <div>
                  <h3 className="team-member-name">
                    {member.firstName} {member.lastName}
                  </h3>
                  <span className="team-member-email">{member.email}</span>
                  <span className="team-member-role">{member.role}</span>
                </div>
              </div>
              <div className="team-member-permissions">
                {member.permissions.map((perm) => (
                  <span key={perm} className="team-permission-tag">
                    {perm.replace(/_/g, ' ')}
                  </span>
                ))}
              </div>
              <div className="team-member-meta">
                <StatusBadge status={member.isActive ? 'active' : 'cancelled'} size="sm" />
                <span className="team-member-joined">
                  Joined {formatDate(member.joinedAt)}
                </span>
              </div>
              <div className="team-member-actions">
                <Button variant="ghost" size="sm">
                  Edit
                </Button>
                <Button variant="ghost" size="sm">
                  Remove
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Card className="team-info-card">
        <h3 className="editor-section-title">Team limits</h3>
        <p className="team-limit-text">
          Your plan allows up to{' '}
          <strong>{mockData.users.getVendorProfile('user-v1')?.teamMemberCount}</strong> team members.
        </p>
      </Card>
    </div>
  );
};

export default TeamMembersPage;
