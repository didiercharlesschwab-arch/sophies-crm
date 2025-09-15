import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Users, Calendar, TrendingUp, AlertTriangle, Clock } from "lucide-react";
import { type Client } from "@shared/schema";

interface DashboardProps {
  clients: Client[];
}

export default function Dashboard({ clients }: DashboardProps) {
  // Calculate metrics
  const totalClients = clients.length;
  const totalRevenue = clients.reduce((sum, client) => {
    return sum + parseFloat(client.amountPaidOnCall || "0");
  }, 0);
  
  const projectedRevenue = clients.reduce((sum, client) => {
    return sum + parseFloat(client.nextMonthAgreedPayment || "0");
  }, 0);
  
  const totalReviews = clients.reduce((sum, client) => {
    return sum + (client.reviewsOrdered || 0);
  }, 0);

  // Get upcoming tasks
  const today = new Date();
  const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
  
  const upcomingContacts = clients.filter(client => {
    if (!client.dateOfNextContact) return false;
    const contactDate = new Date(client.dateOfNextContact);
    return contactDate >= today && contactDate <= nextWeek;
  });
  
  const upcomingCommissions = clients.filter(client => {
    if (!client.dateCommissionsDue) return false;
    const commissionDate = new Date(client.dateCommissionsDue);
    return commissionDate >= today && commissionDate <= nextWeek;
  });
  
  const overdueTasks = clients.filter(client => {
    const nextContactOverdue = client.dateOfNextContact && new Date(client.dateOfNextContact) < today;
    const commissionOverdue = client.dateCommissionsDue && new Date(client.dateCommissionsDue) < today;
    return nextContactOverdue || commissionOverdue;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="metric-total-clients">
              {totalClients}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-1" data-testid="metric-total-revenue">
              {formatCurrency(totalRevenue)}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Projected Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-2" data-testid="metric-projected-revenue">
              {formatCurrency(projectedRevenue)}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="metric-total-reviews">
              {totalReviews}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts and Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Overdue Tasks */}
        {overdueTasks.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <AlertTriangle className="h-5 w-5" />
                Overdue Tasks ({overdueTasks.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {overdueTasks.slice(0, 5).map((client) => (
                  <div key={client.id} className="border-l-2 border-destructive pl-3">
                    <div className="font-medium text-sm" data-testid={`overdue-client-${client.id}`}>
                      {client.clientName}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {client.dateOfNextContact && new Date(client.dateOfNextContact) < today && (
                        <div>Contact overdue: {formatDate(client.dateOfNextContact)}</div>
                      )}
                      {client.dateCommissionsDue && new Date(client.dateCommissionsDue) < today && (
                        <div>Commission overdue: {formatDate(client.dateCommissionsDue)}</div>
                      )}
                    </div>
                  </div>
                ))}
                {overdueTasks.length > 5 && (
                  <div className="text-xs text-muted-foreground">
                    +{overdueTasks.length - 5} more overdue tasks
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Upcoming Contacts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming Contacts ({upcomingContacts.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingContacts.length === 0 ? (
                <div className="text-sm text-muted-foreground">
                  No upcoming contacts this week
                </div>
              ) : (
                upcomingContacts.slice(0, 5).map((client) => (
                  <div key={client.id} className="flex justify-between items-center">
                    <div className="font-medium text-sm" data-testid={`upcoming-contact-${client.id}`}>
                      {client.clientName}
                    </div>
                    <Badge variant="secondary">
                      {formatDate(client.dateOfNextContact!)}
                    </Badge>
                  </div>
                ))
              )}
              {upcomingContacts.length > 5 && (
                <div className="text-xs text-muted-foreground">
                  +{upcomingContacts.length - 5} more this week
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        {/* Upcoming Commissions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Commission Due ({upcomingCommissions.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingCommissions.length === 0 ? (
                <div className="text-sm text-muted-foreground">
                  No commissions due this week
                </div>
              ) : (
                upcomingCommissions.slice(0, 5).map((client) => (
                  <div key={client.id} className="flex justify-between items-center">
                    <div className="font-medium text-sm" data-testid={`upcoming-commission-${client.id}`}>
                      {client.clientName}
                    </div>
                    <Badge variant="default">
                      {formatDate(client.dateCommissionsDue!)}
                    </Badge>
                  </div>
                ))
              )}
              {upcomingCommissions.length > 5 && (
                <div className="text-xs text-muted-foreground">
                  +{upcomingCommissions.length - 5} more this week
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {clients.slice(0, 5).map((client) => (
              <div key={client.id} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                <div className="flex-1">
                  <div className="font-medium" data-testid={`recent-activity-${client.id}`}>
                    {client.clientName}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Last test ad call: {client.testAdCallDate ? formatDate(client.testAdCallDate) : 'Not scheduled'}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-chart-1">
                    {formatCurrency(parseFloat(client.amountPaidOnCall || "0"))}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {client.reviewsOrdered || 0} reviews
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}