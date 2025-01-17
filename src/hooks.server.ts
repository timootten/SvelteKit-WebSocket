
export const handle = ({ event, resolve }) => {
  console.log('Server Hook', event.request.url);
  return resolve(event);
}