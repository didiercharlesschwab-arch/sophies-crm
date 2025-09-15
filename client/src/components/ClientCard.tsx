import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, DollarSign, Phone, Mail, Edit, Trash2 } from "lucide-react";
import { type Client } from "@shared/schema";

interface ClientCardProps {
  client: Client;
  onEdit?: (client: Client) => void;
  onDelete?: (clientId: string) => void;
}

export default function ClientCard({ client, onEdit, onDelete }: ClientCardProps) {
  const formatCurrency = (amount: string | null) => {
    if (!amount) return "$0.00";
    return `$${parseFloat(amount).toFixed(2)}`;
  };

  const formatDate = (date: Date | string | null) => {
    if (!date) return "Not set";
    return new Date(date).toLocaleDateString();
  };

  const getDateStatus = (date: Date | string | null) => {
    if (!date) return "neutral";
    const targetDate = new Date(date);
    const today = new Date();
    const diffDays = Math.ceil((targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return "overdue";
    if (diffDays <= 7) return "due-soon";
    return "upcoming";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "overdue": return "destructive";
      case "due-soon": return "default";
      case "upcoming": return "secondary";
      default: return "secondary";
    }
  };

  return (
    <Card className="hover-elevate" data-testid={`card-client-${client.id}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-semibold" data-testid={`text-client-name-${client.id}`}>
          {client.clientName}
        </CardTitle>
        <div className="flex gap-2">
          <Button 
            size="icon" 
            variant="ghost" 
            onClick={() => onEdit?.(client)}
            data-testid={`button-edit-${client.id}`}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button 
            size="icon" 
            variant="ghost" 
            onClick={() => onDelete?.(client.id)}
            data-testid={`button-delete-${client.id}`}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Contact Information */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span data-testid={`text-email-${client.id}`}>{client.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span data-testid={`text-phone-${client.id}`}>{client.phoneNumber}</span>
          </div>
        </div>

        {/* Financial Information */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <DollarSign className="h-3 w-3" />
              Amount Paid
            </div>
            <div className="font-semibold text-chart-1" data-testid={`text-amount-paid-${client.id}`}>
              {formatCurrency(client.amountPaidOnCall)}
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Next Payment</div>
            <div className="font-semibold" data-testid={`text-next-payment-${client.id}`}>
              {formatCurrency(client.nextMonthAgreedPayment)}
            </div>
          </div>
        </div>

        {/* Important Dates */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-sm">
              <Calendar className="h-3 w-3 text-muted-foreground" />
              Next Contact
            </div>
            <Badge 
              variant={getStatusColor(getDateStatus(client.dateOfNextContact)) as any}
              data-testid={`badge-next-contact-${client.id}`}
            >
              {formatDate(client.dateOfNextContact)}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">Commission Due</div>
            <Badge 
              variant={getStatusColor(getDateStatus(client.dateCommissionsDue)) as any}
              data-testid={`badge-commission-due-${client.id}`}
            >
              {formatDate(client.dateCommissionsDue)}
            </Badge>
          </div>
        </div>

        {/* Reviews & Notes */}
        {client.reviewsOrdered !== null && client.reviewsOrdered > 0 && (
          <div className="text-sm">
            <span className="text-muted-foreground">Reviews Ordered: </span>
            <span className="font-medium" data-testid={`text-reviews-${client.id}`}>
              {client.reviewsOrdered}
            </span>
          </div>
        )}
        
        {client.notes && (
          <div className="text-sm">
            <span className="text-muted-foreground">Notes: </span>
            <span className="text-muted-foreground" data-testid={`text-notes-${client.id}`}>
              {client.notes.length > 100 ? `${client.notes.substring(0, 100)}...` : client.notes}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}