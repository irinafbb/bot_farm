#!/bin/bash

psql -v ON_ERROR_STOP=1 --dbname "$POSTGRES_DB" --username "$POSTGRES_USER" <<EOF
create extension if not exists pgcrypto;
EOF