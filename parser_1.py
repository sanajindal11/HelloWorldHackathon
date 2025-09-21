import pandas as pd # type: ignore
import json

class ClassGrade:
    def __init__(self, csv_file):
        self.csv_file = csv_file
        self.assignments = []
        self.overall_grade = None
        self._parse_csv()

    def _parse_csv(self):
        df = pd.read_csv(self.csv_file)

        for _, row in df.iterrows():
            if "Overall Grade" in str(row["Assignment Name"]):
                self.overall_grade = row["Percentage"]
                continue
            self.assignments.append({
                "Assignment": row["Assignment Name"],
                "Grade": row["Percentage"],
                "DueDate": "",     # leave blank for extension UI
                "Category": ""     # hw/quiz/etc. user fills later
            })

    def export_for_extension(self, csv_out="extension_ready.csv", json_out="extension_ready.json"):
        df = pd.DataFrame(self.assignments)
        df.to_csv(csv_out, index=False)
        print(f"Exported CSV to {csv_out}")

        with open(json_out, "w") as f:
            json.dump(self.assignments, f, indent=2)
        print(f"Exported JSON to {json_out}")


# ---------------- DRIVER ----------------
if __name__ == "__main__":
    grades = ClassGrade("input.csv")
    grades.export_for_extension()
