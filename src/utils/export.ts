import { toast } from "react-toastify";

/**
 * Standard utility for exporting data to CSV.
 * @param data Array of objects representing rows.
 * @param headers Array of strings representing column headers.
 * @param filename Desired filename for the exported CSV.
 * @param transform Optional function to transform each row before joining.
 */
export const exportToCSV = (
  data: any[],
  headers: string[],
  filename: string,
  transform?: (row: any) => any[]
) => {
  toast.info("Preparing data export...");

  setTimeout(() => {
    try {
      const csvRows = [
        headers.join(","),
        ...data.map(row => {
          const values = transform ? transform(row) : Object.values(row);
          return values.map(v => {
            const escaped = ('' + v).replace(/"/g, '""');
            return `"${escaped}"`;
          }).join(",");
        })
      ];

      const csvContent = csvRows.join("\n");
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("Data exported successfully!");
    } catch (error) {
      console.error("Export Error:", error);
      toast.error("Export failed. Please try again.");
    }
  }, 1000);
};
