import { User } from "@/types/user";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MessageCircle, User as UserIcon, Phone, Lock } from "lucide-react";

interface UserTableProps {
  users: User[];
}

const UserTable = ({ users }: UserTableProps) => {
  const generateWhatsAppLink = (phone: string, password: string) => {
    const cleanPhone = phone.replace(/\D/g, '');
    const message = `Ассалому алейкум! Сизнинг номерингиз: ${phone} Сизнинг паролингиз: ${password}`;
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
  };

  if (users.length === 0) {
    return (
      <Card className="shadow-[var(--shadow-soft)]">
        <CardContent className="flex flex-col items-center justify-center py-16">
          <UserIcon className="h-16 w-16 text-muted-foreground mb-4" />
          <p className="text-muted-foreground text-lg">Загрузите Excel файл для начала</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-[var(--shadow-medium)]">
      <CardHeader className="border-b bg-secondary/30">
        <CardTitle className="text-xl flex items-center gap-2">
          <UserIcon className="h-5 w-5" />
          Список пользователей ({users.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30">
                <TableHead className="font-semibold">ID</TableHead>
                <TableHead className="font-semibold">
                  <div className="flex items-center gap-2">
                    <UserIcon className="h-4 w-4" />
                    Имя
                  </div>
                </TableHead>
                <TableHead className="font-semibold">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Номер телефона
                  </div>
                </TableHead>
                <TableHead className="font-semibold">
                  <div className="flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    Пароль
                  </div>
                </TableHead>
                <TableHead className="text-right font-semibold">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} className="hover:bg-muted/20 transition-colors">
                  <TableCell className="font-medium">{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell className="font-mono text-sm">{user.phone}</TableCell>
                  <TableCell className="font-mono text-sm">{"•".repeat(8)}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      className="bg-whatsapp hover:bg-whatsapp/90 text-whatsapp-foreground gap-2"
                      onClick={() => window.open(generateWhatsAppLink(user.phone, user.password), '_blank')}
                    >
                      <MessageCircle className="h-4 w-4" />
                      WhatsApp
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserTable;
