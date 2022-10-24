import { MiddlewareRequest } from "@netlify/next";

export async function middleware(NextRequest) {
  // enrich request with advanced middleware
  const request = new MiddlewareRequest(NextRequest);
  const response = await request.next();
  console.log(request);

  if (NextRequest.nextUrl.pathname === "/") {
    const bucket = Math.random();
    console.log(bucket);
    if (bucket < 0.5) {
      const discountedPrice = "100";
      response.setPageProp("product.price", discountedPrice);
      response.replaceText("#price", discountedPrice);
    }
  }

  return response;
}
