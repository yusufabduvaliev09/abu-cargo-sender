import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import * as XLSX from "xlsx";
import { User } from "@/types/user";
import { toast } from "@/hooks/use-toast";

interface ExcelImportProps {
  onImport: (users: User[]) => void;
}

const ExcelImport = ({ onImport }: ExcelImportProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        const users: User[] = jsonData.map((row: any) => ({
          id: row.ID || row.id || "",
          name: row["Имя"] || row.Name || row.name || "",
          phone: String(row["Номер телефона"] || row.Phone || row.phone || ""),
          password: String(row["Пароль"] || row.Password || row.password || ""),
        }));

        if (users.length === 0) {
          toast({
            title: "Ошибка",
            description: "Файл не содержит данных",
            variant: "destructive",
          });
          return;
        }

        onImport(users);
        toast({
          title: "Успешно!",
          description: `Загружено ${users.length} пользователей`,
        });
      } catch (error) {
        console.error("Error parsing Excel file:", error);
        toast({
          title: "Ошибка",
          description: "Не удалось прочитать файл. Проверьте формат.",
          variant: "destructive",
        });
      }
    };
    reader.readAsBinaryString(file);

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileUpload}
        className="hidden"
        id="excel-upload"
      />
      <Button
        onClick={() => fileInputRef.current?.click()}
        size="lg"
        className="gap-2 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-medium)] transition-shadow"
      >
        <Upload className="h-5 w-5" />
        Импортировать Excel
      </Button>
    </div>
  );
};

export default ExcelImport;
