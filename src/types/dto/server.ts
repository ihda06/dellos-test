export interface ServerResponse<T, K = ServerMetaResponse> {
  status: string;
  response: {
    docs: T;
    meta: K;
  };
  copyright: string;
}

export interface ServerMetaResponse {
  hits: number;
  offset: number;
  time: number;
}
