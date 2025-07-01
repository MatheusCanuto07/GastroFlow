import { page, navigating } from "$app/stores";
import { get } from "svelte/store";
import { goto } from "$app/navigation";

class SSRFilters {
  // dentro da store page tem a url
  // Toda vez que a page.url mudar o valor de Filters vai mudar
  Filters = $derived.by(() => get(page).url);

  // Este método retorna o valor de um parâmetro de URL específico. Por exemplo, get('page') retornaria o valor do parâmetro page da URL atual.
  get(name: string) {
    return this.Filters.searchParams.get(name);
  }

  // Permite atualizar a URL com novos parâmetros. Ele recebe um objeto Record<string, string>, onde as chaves são os nomes dos parâmetros e os valores são os valores desejados.
  update(filters: Record<string, string>) {
    const url = new URL(this.Filters);
    Object.entries(filters).forEach(([name, value]) => {
      if (!value) {
        url.searchParams.delete(name);
      }
      if (value !== "") url.searchParams.set(name, value);
      else url.searchParams.delete(name);
    });

    if (typeof window !== "undefined") {
      goto(url, { keepFocus: true });
    }
  }
  
  //Remove um ou mais parâmetros da URL atual.
  clear(...params: string[]) {
    const url = new URL(this.Filters);
    params.forEach((p) => url.searchParams.delete(p));

    if (typeof window !== "undefined") {
      goto(url, { keepFocus: true });
    }
  }
  
  //Verifica se algum dos parâmetros especificados está presente na URL, retornando true se ao menos um deles estiver presente.
  isFiltered(...params: string[]) {
    return (
      params.length > 0 && params.some((p) => this.Filters.searchParams.has(p))
    );
  }
}

export const filters = new SSRFilters();