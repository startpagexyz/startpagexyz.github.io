/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "startpage"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/",
  duckduckgo: "https://duckduckgo.com/?q=",
  ecosia: "https://www.ecosia.org/search?q=",
  google: "https://www.google.com/search?q=",
  startpage: "https://www.startpage.com/search?q=",
  youtube: "https://www.youtube.com/results?q=",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  return engineUrls[engine] + value
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"BIav09pOSGAQPWjR","label":"media","bookmarks":[{"id":"qhbdklOEUhgTRtY1","label":"youtube","url":"https://www.youtube.com"},{"id":"V5PKv1iHkMcyG5DC","label":"twitter","url":"https://twitter.com/"}, {"id":"V5PKv1iHkMcyG5DC","label":"instagram","url":"https://instagram.com/"}]},{"id":"VRqEq8ltmc1epoua","label":"misc","bookmarks":[{"id":"yBL4SJ0dkN72cP0q","label":"github","url":"https://github.com/"},{"id":"YHgcflxxvUEM5PnC","label":"steam","url":"https://steamcommunity.com/id/metalcock"}, {"id":"V5PKv1iHkMcyG5DC","label":"movies","url":"https://hdtoday.tv/"}]},{"id":"UFgxt5OQBlN5Y6TM","label":"school","bookmarks":[{"id":"t5669mmqY90AFC3Q","label":"program","url":"https://cdn.discordapp.com/attachments/1048351188640333934/1201930756503646248/image.png"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
