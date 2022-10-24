import { MiddlewareRequest } from "@netlify/next";

export async function middleware(NextRequest) {
  // enrich request with advanced middleware
  const request = new MiddlewareRequest(NextRequest);
  const response = await request.next();

  if (NextRequest.nextUrl.pathname === "/") {
    const bucket = Math.random();
    console.log(bucket);
    if (bucket < 0.5) {
      const discountedPrice = "$100";
      response.replaceText("#price", discountedPrice);
      response.transformData((data) => {
        data.pageProps.product.price = discountedPrice;
        console.log(data);
        return data;
      });
    }
  }

  if (NextRequest.nextUrl.pathname === "/more-complex-example") {
    const bucket = Math.random();
    console.log(bucket);
    if (bucket < 0.5) {
      response.setPageProp("discountedPrice", "$100");
    }
  }

  return response;
}
