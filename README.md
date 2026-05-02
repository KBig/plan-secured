# 🔒 Plan Immobilier — Accès sécurisé

Document chiffré avec **AES-256-GCM + PBKDF2 (100 000 itérations)**.

## Accès

**URL d'accès direct (à utiliser) :**
- https://raw.githack.com/KBig/plan-secured/main/index.html
- https://raw.githack.com/KBig/plan-secured/main/plan_complet_secured.html

⚠️ **NE PAS utiliser jsdelivr** (`cdn.jsdelivr.net`) : il sert les fichiers HTML comme `text/plain` (pour des raisons de sécurité), donc le navigateur affiche le code source au lieu de la page rendue. Utiliser raw.githack qui sert avec le bon MIME type `text/html`.

Le contenu est cryptographiquement inaccessible sans le mot de passe.

## Sécurité

- **Chiffrement** : AES-256-GCM (norme militaire / bancaire)
- **Dérivation de clé** : PBKDF2 100 000 itérations SHA-256
- **Backend** : Aucun (100% client-side via Web Crypto API native)
- **Données transmises** : Aucune (le mot de passe ne quitte jamais le navigateur)

## Génération automatique

Ce repo est mis à jour automatiquement depuis le repo source privé.
Le HTML chiffré est régénéré à chaque modification du plan source.
