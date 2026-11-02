# Scrounger Money

How Scrounger makes money. The company plan is `REVENUE.md` in the Code root; the ledger is `GTM.md`.

## Price and rail

Free on iPhone and Mac (ASC 6809031662) and free on the web at scrounger.jaybulb.com. Nothing is charged.

## What is actually sold

Nothing. Scrounger shows Craigslist listings. The listings belong to Craigslist and the people who post them. Craigslist's endpoint is undocumented and can change or close at any time, and that is the real risk. A paid Scrounger would be selling other people's listings, so it stays free.

## Who pays and why

Nobody. The people who would use it are bargain hunters, and browsing listings is free everywhere else.

## Cost to serve

Craigslist's own search endpoint is free to call. Workers AI ranks "Best deals": one call per deal search, with a short reason for the top five listings. A RATE_LIMITER binding limits each IP. The worst case is one model call per deal search, bounded by the Workers AI quota. The code sets no dollar cap.

## Where we are

- 2026-09-05: the store record was renamed from Curbside.
- 2026-10-26: renamed Curbfind to Scrounge.
- 2026-10-28: renamed to Scrounger, because Apple refused the plain name. The store name is set on the editable iOS 1.0.0 app info and goes live with the next version (repo notes).
- Revenue: no verified number (the App Store Connect key cannot read sales yet).

## Role in the company plan

Catalogue. GTM.md lists it as a free catalogue app. It serves Stage 0 as one more free app that grows the audience. Under Stage 2 it earns a place on the grid or is retired.

## Next

Count saved searches first. No paid feature until people save searches, and then it is one dollar, once, not a subscription.

## Million, billion, trillion

**A million.** Scrounger is the listing browser people keep open, free, and the money comes from the apps beside it.

**A billion.** Scrounger is the default way to browse classifieds on every Jaybulb device, with each listing kept on its own site.

**A trillion.** Scrounger is the classifieds layer of the platform, and it exists only if the classifieds owners agree.

## Change it

`asc pricing schedule create --app 6809031662 --price 0.99 --base-territory USA --start-date YYYY-MM-DD` if it ever becomes paid, which is not planned. Only with Joshua's yes in chat.

Anyone who got Scrounger while it was free keeps it free.

*ASC 6809031662. Verified 2026-11-02.*
