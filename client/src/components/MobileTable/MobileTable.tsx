import "./MobileTable.css";
import { TableProps } from "../Table/Table";
import { sanitizeString } from "../../utils/sanitize-string";

const MobileTable = ({ columns, items }: TableProps) => {
  return (
    <table className="mobile-table">
      <thead>
        <tr>
          <th className="mobile-table__cell">{columns[0]}</th>
          <th className="mobile-table__cell">{columns[columns.length - 1]}</th>
        </tr>
        <tr className="mobile-table__row--last">
          {columns.slice(1, columns.length - 1).map((col, index) => (
            <th key={index} className="mobile-table__cell">
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <>
            <tr className="mobile-table__row">
              <td className="mobile-table__cell">{item.categoryName}</td>
              <td className="mobile-table__cell">{item.opponentName}</td>
            </tr>

            {item.questions.map((question, index) => (
              <tr
                className={`mobile-table__row ${
                  index === item.questions.length - 1
                    ? "mobile-table__row--last"
                    : undefined
                }`}
              >
                <td className="mobile-table__cell">
                  {sanitizeString(question.questionName)}
                </td>
                <td className="mobile-table__cell">
                  {question.isCorrectlyAnswered ? "Yes" : "No"}
                </td>
              </tr>
            ))}
          </>
        ))}
      </tbody>
    </table>
  );
};

export default MobileTable;
