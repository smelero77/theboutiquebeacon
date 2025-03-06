-- Insertar una cuenta de marketplace para el usuario
INSERT INTO marketplaceaccounts (id, user_id)
VALUES (
  uuid_generate_v4(),
  'ad4cf880-e40f-4a67-a606-4ff2b22de2b7'
)
RETURNING id INTO marketplace_account_id;

-- Insertar una tienda de ejemplo con su cuenta de marketplace y órdenes
WITH new_marketplace_account AS (
  INSERT INTO marketplaceaccounts (id, user_id)
  VALUES (
    uuid_generate_v4(),
    'ad4cf880-e40f-4a67-a606-4ff2b22de2b7'
  )
  RETURNING id
), new_store AS (
  INSERT INTO stores (id, account_id)
  SELECT 
    uuid_generate_v4(),
    id
  FROM new_marketplace_account
  RETURNING id
), dates AS (
  -- Generar fechas para los últimos 3 años
  SELECT 
    generate_series(
      NOW() - interval '3 years',
      NOW(),
      interval '1 month'
    )::timestamp with time zone as order_date
)
-- Insertar órdenes de ejemplo distribuidas en el tiempo
INSERT INTO orders (
  id,
  store_id,
  marketplace_order_id,
  order_date,
  status,
  total_amount,
  payment_method,
  buyer_info,
  currency_code,
  created_at,
  updated_at,
  last_updated_at,
  last_marketplace_update,
  is_shipped,
  currency
)
SELECT
  uuid_generate_v4(),
  s.id AS store_id,
  'ORDER-' || d.order_date::date || '-' || generate_series(1, 3),
  d.order_date + (random() * interval '1 month'),
  CASE floor(random() * 3)
    WHEN 0 THEN 'completed'
    WHEN 1 THEN 'processing'
    ELSE 'cancelled'
  END,
  ROUND((random() * 1000 + 100)::numeric, 2),  -- Asegurar 2 decimales
  CASE floor(random() * 3)
    WHEN 0 THEN 'credit_card'
    WHEN 1 THEN 'paypal'
    ELSE 'bank_transfer'
  END,
  jsonb_build_object(
    'name', 'Cliente ' || generate_series(1, 3),
    'email', 'cliente' || generate_series(1, 3) || '@ejemplo.com',
    'country', CASE floor(random() * 3)
      WHEN 0 THEN 'España'
      WHEN 1 THEN 'México'
      ELSE 'Argentina'
    END
  ),
  'EUR',
  d.order_date,  -- created_at
  d.order_date,  -- updated_at
  d.order_date,  -- last_updated_at
  d.order_date,  -- last_marketplace_update
  random() > 0.5,  -- is_shipped
  'EUR'  -- currency
FROM new_store s
CROSS JOIN dates d
CROSS JOIN generate_series(1, 3);