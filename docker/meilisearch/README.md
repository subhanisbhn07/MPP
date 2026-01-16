# Self-Hosted Meilisearch for MPP

This directory contains the Docker setup for running Meilisearch locally. Meilisearch is a free, open-source search engine that provides instant, typo-tolerant search.

## Quick Start

1. **Start Meilisearch:**
   ```bash
   cd docker/meilisearch
   docker-compose up -d
   ```

2. **Verify it's running:**
   ```bash
   curl http://localhost:7700/health
   # Should return: {"status":"available"}
   ```

3. **Index phone data:**
   ```bash
   # From project root
   node scripts/meilisearch/index-phones.mjs
   ```

4. **Test search:**
   ```bash
   curl 'http://localhost:7700/indexes/phones/search' \
     -H 'Content-Type: application/json' \
     --data-binary '{"q": "iPhone"}'
   ```

## Environment Variables

Add these to your `.env` file:

```env
# Meilisearch Configuration
NEXT_PUBLIC_MEILISEARCH_HOST=http://localhost:7700
MEILISEARCH_API_KEY=mpp_search_master_key_change_in_production
```

## Production Deployment

For production, you should:

1. **Change the master key** in `docker-compose.yml`:
   ```yaml
   environment:
     - MEILI_MASTER_KEY=your_secure_random_key_here
     - MEILI_ENV=production
   ```

2. **Use a reverse proxy** (nginx/traefik) with HTTPS

3. **Set up backups** for the `meilisearch_data` volume

## Meilisearch Dashboard

Access the Meilisearch dashboard at: http://localhost:7700

## Commands

```bash
# Start Meilisearch
docker-compose up -d

# Stop Meilisearch
docker-compose down

# View logs
docker-compose logs -f

# Restart
docker-compose restart

# Remove data and start fresh
docker-compose down -v
docker-compose up -d
```

## License

Meilisearch is MIT licensed - completely free for commercial use.
