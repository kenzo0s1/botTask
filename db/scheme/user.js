
export const test = 'CREATE TABLE "user"\n' +
    '(\n' +
    '  id bigserial NOT NULL,\n' +
    '  name text NOT NULL,\n' +
    '  userid text NOT NULL UNIQUE,\n' +
    '  CONSTRAINT user_pkey PRIMARY KEY (id)\n' +
    ')'