import { useState } from "react";
import { User } from "@/types/user";
import ExcelImport from "@/components/ExcelImport";
import UserTable from "@/components/UserTable";
import { Package } from "lucide-react";

const Index = () => {
  const [users, setUsers] = useState<User[]>([]);

  const handleImport = (importedUsers: User[]) => {
    setUsers(importedUsers);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Package className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold bg-[var(--gradient-primary)] bg-clip-text text-transparent">
              Abu Cargo Access Sender
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Импортируйте Excel-файл с данными пользователей и отправьте доступ через WhatsApp
          </p>
        </header>

        {/* Import Section */}
        <div className="mb-8">
          <ExcelImport onImport={handleImport} />
        </div>

        {/* Table Section */}
        <UserTable users={users} />

        {/* Instructions */}
        {users.length === 0 && (
          <div className="mt-12 p-6 bg-card rounded-lg border shadow-[var(--shadow-soft)]">
            <h2 className="text-xl font-semibold mb-4">Инструкция:</h2>
            <ol className="space-y-2 text-muted-foreground list-decimal list-inside">
              <li>Подготовьте Excel-файл с колонками: <strong>ID</strong>, <strong>Имя</strong>, <strong>Номер телефона</strong>, <strong>Пароль</strong></li>
              <li>Нажмите кнопку "Импортировать Excel" и выберите файл</li>
              <li>Данные отобразятся в таблице ниже</li>
              <li>Нажмите кнопку WhatsApp рядом с пользователем для отправки данных</li>
            </ol>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
