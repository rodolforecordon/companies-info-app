import { Fragment } from "react";
import Link from "next/link";

export default function CompanyNumbers(props) {
  function capitalizeFirstLetter(string) {
    if (string) return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <Fragment>
      <Link href={`/company/${props.numberInfo?.company_id}`}>
        <button>Go Back</button>
      </Link>
      <p>
        {`${props.numberInfo?.id.substring(
          0,
          3
        )} ${props.numberInfo?.id.substring(3, 12)}`}
      </p>
      <p>{capitalizeFirstLetter(props.numberInfo?.type)}</p>
    </Fragment>
  );
}

export async function getServerSideProps(context) {
  const numberId = context.params.numberId;
  const responseNumbers = await fetch(
    `http://localhost:3000/api/numbers/${numberId}`
  );
  const numberInfo = await responseNumbers.json();

  return {
    props: {
      numberInfo,
    },
  };
}
