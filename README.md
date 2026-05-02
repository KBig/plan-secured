# 🔒 Plan Immobilier — Accès sécurisé

Document chiffré avec **AES-256-GCM + PBKDF2 (100 000 itérations)**.

## Accès

**URL d'accès direct :**
- Via raw.githack : https://raw.githack.com/KBig/plan-secured/main/plan_complet_secured.html
- Via jsdelivr (plus rapide) : https://cdn.jsdelivr.net/gh/KBig/plan-secured@main/plan_complet_secured.html

Le contenu est cryptographiquement inaccessible sans le mot de passe.

## Sécurité

- **Chiffrement** : AES-256-GCM (norme militaire / bancaire)
- **Dérivation de clé** : PBKDF2 100 000 itérations SHA-256
- **Backend** : Aucun (100% client-side via Web Crypto API native)
- **Données transmises** : Aucune (le mot de passe ne quitte jamais le navigateur)

## Génération automatique

Ce repo est mis à jour automatiquement depuis le repo source privé.
Le HTML chiffré est régénéré à chaque modification du plan source.
