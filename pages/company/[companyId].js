import { Fragment } from "react";
import Link from "next/link";

export default function CompanyNumbers(props) {
  function capitalizeFirstLetter(string) {
    if (string) return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <Fragment>
      <Link href="/">
        <button>Go Back</button>
      </Link>
      <h1>{props.companyName}</h1>
      <table>
        <thead>
          <tr>
            <th>Number</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {props.companyNumbers?.map((el) => (
            <tr key={el.id}>
              <td>
                <Link href={`/numbers/${el.id}`}>
                  {`${el.id.substring(0, 3)} ${el.id.substring(3, 12)}`}
                </Link>
              </td>
              <td>{capitalizeFirstLetter(el.type)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
}

export async function getServerSideProps(context) {
  const companyId = context.params.companyId;
  const responseNumbers = await fetch(
    `http://localhost:3000/api/companies/${companyId}`
  );
  const companyNumbers = await responseNumbers.json();

  const responseCompany = await fetch("http://localhost:3000/api/companies");
  let companyName = await responseCompany.json();
  companyName = companyName.filter((el) => el.id === Number(companyId));
  companyName = companyName[0].name;

  return {
    props: {
      companyNumbers,
      companyName,
    },
  };
}
