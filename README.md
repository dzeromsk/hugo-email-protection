# hugo-email-protection

Hugo theme component that hides mail addresses in order to keep them from being accessed by bots.

## Installation

Navigate to your hugo project root and run:

```
git submodule add https://github.com/dzeromsk/hugo-email-protection themes/email-protection
```

Add `email-protection` as the left-most element of the `theme` list variable in your site's or theme's configuration file `config.yaml` or `config.toml`. Example, with `config.yaml`:

```yaml
theme: ["email-protection", "my-theme"]
```

or, with `config.toml`,

```toml
theme = ["email-protection", "my-theme"]
```

## Usage

In your site, use the shortcode, this way:
```go
{{< email-protection "jane.doe@example.com" >}}
```

### Inline javascript

You can inline javascript on a single page by placing below shortcode usually at the bottom of your `.md` content file:

```go
{{< email-protection/inline >}}
```

### Global footer script

Or you can add it globally for example using [hugo-book](https://github.com/alex-shpak/hugo-book/) `layouts/partials/docs/inject/footer.html` html template:

```html
{{- $script := resources.Get "email-protection.js" | resources.Minify | resources.Fingerprint }}
<script defer src="{{ $script.RelPermalink }}" {{ template "integrity" $script }}></script>
```

## Shortcodes

| Shortcode                 | Usage                                                                  |
| ------------------------- | ---------------------------------------------------------------------- |
| `email-protection`        | `{{< email-protection "jane.doe@example.com" >}}`                      |
| `email-protection/mailto` | `[Contact us]({{< email-protection/mailto "jane.doe@example.com" >}})` |
| `email-protection/url`    | `{{< email-protection/url "jane.doe@example.com" >}}`                  |
| `email-protection/inline` | `{{< email-protection/inline >}}`                                      |
| `email-protection/script` | `{{< email-protection/script >}}`                                      |

## Inspiration

Heavily inspired by Cloudflare email protection from bots and scrapers service. In short it protects you from bots by hiding on-page emails and then using Javascript to decode them on page load.

- [Decoding Cloudflare-protected Emails](https://usamaejaz.com/cloudflare-email-decoding/)
- [Why CloudFlare’s e-mail protection is no longer safe](https://antonvroemans.medium.com/expand-your-spam-mailing-list-with-cloudflares-poor-obfuscation-fdc3cc8f4ccd)
- [email-decode.js](https://gist.github.com/rockthrower69/1161e446d759264c7802b7a6f42e2bc2)
