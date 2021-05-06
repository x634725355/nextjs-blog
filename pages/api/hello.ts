// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import { main } from "../../lib/admin";

export default (req: NextApiRequest, res: NextApiResponse) => {
  
  try {
    const data = main();
  } catch (error) {
    console.error("连接数据库报错", error);
  }

  res.status(200).json({ name: 'John Doe' })
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb'
    }
  }
}
