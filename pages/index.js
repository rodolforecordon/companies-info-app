import { Fragment } from "react";
import Link from "next/link";

export default function Companies(props) {
  return (
    <Fragment>
      <h1>Companies</h1>
      <table>
        <thead>
          <tr>
            <th>Company</th>
            <th>vatin</th>
          </tr>
        </thead>
        <tbody>
          {props.companies?.map((el) => (
            <tr key={el.id}>
              <td>
                <Link href={`/company/${el.id}`}>{el.name}</Link>
              </td>
              <td>{el.vatin}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
}

export async function getServerSideProps() {
  const response = await fetch("http://localhost:3000/api/companies");
  const companies = await response.json();
  return {
    props: {
      companies,
    },
  };
}
