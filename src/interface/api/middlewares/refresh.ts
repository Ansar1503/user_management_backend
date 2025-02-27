// import { sendResponse } from "../../../shared/response";
// import { Response } from "express";
// import { HTTP_STATUS_CODES } from "../../../shared/statuscodes";
// import jwt from 'jsonwebtoken'

// export function refresh(req: any, res: Response) {
//   const refreshKey = process.env.JWT_REFRESH_TOKEN_SECRET;
//   if (!refreshKey) {
//     return sendResponse(
//       res,
//       HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
//       null,
//       "Server misconfiguration"
//     );
//   }

//   const refreshToken = req.cookies.refresh;
//   if (!refreshToken) {
//     return sendResponse(
//       res,
//       HTTP_STATUS_CODES.BAD_REQUEST,
//       null,
//       "Refresh token missing"
//     );
//   }

//   jwt.verify(refreshToken, refreshKey, (err: any, decoded: any) => {
//     if (err) {
//       return sendResponse(
//         res,
//         HTTP_STATUS_CODES.UNAUTHORIZED,
//         null,
//         "Invalid or expired refresh token"
//       );
//     }

//     const newAccessToken = jwt.sign(
//       { id: decoded.id, role: decoded.role },
//       process.env.JWT_ACCESS_TOKEN_SECRET!,
//       {
//         expiresIn: "15m", 
//       }
//     );

//     res.cookie("access", newAccessToken, {
//       httpOnly: true,
//       secure:false,
//       sameSite: "strict",
//       maxAge: 15 * 60 * 1000, 
//     });

//     req.user = decoded; 
//     return sendResponse(
//       res,
//       HTTP_STATUS_CODES.ok,
//       newAccessToken,
//       "refresh token created"
//     );
//   });
// }
