interface HistoryProps {
  pathname: string;
  search: string;
  hash: string;
  origin: string;
  href: string;
  params: Record<string, string>;
}
/**
 * 获取当前页面的 history 对象
 * @returns 
 */
export function useHistory(): HistoryProps {
  const url = new URL(window.location.href);
  const {
    pathname,
    search,
    hash,
    origin,
    href,
    searchParams,
  } = url;
  const params = Object.fromEntries(searchParams.entries());
  return {
    pathname,
    search,
    hash,
    origin,
    href,
    params,
  };
}