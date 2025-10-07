#!/bin/bash
# docker-entrypoint-initdb.d/00-init-hba.sh
echo "host all all 0.0.0.0/0 md5" >> "$PGDATA/pg_hba.conf"
echo "host all all ::/0 md5" >> "$PGDATA/pg_hba.conf"
