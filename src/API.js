

export const Homeget = async (url, data) => {
  const res = await fetch(url, {
      method: 'get',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      }, body: JSON.stringify((data))
  });
  const Resultdata = await res.json();
//   console.log('Homeget ---- >>', Resultdata)

  return Resultdata;
}