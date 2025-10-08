// Generated TypeScript client for AT Protocol records
// Generated at: 2025-10-07 22:44:50 UTC
// Lexicons: 16

/**
 * @example Usage
 * ```ts
 * import { AtProtoClient } from "./generated_client.ts";
 *
 * const client = new AtProtoClient(
 *   'https://api.slices.network',
 *   'at://did:plc:rcjhtxh5v4mwvrbezap3hixf/network.slices.slice/3m2n7by3cbm2v'
 * );
 *
 * // Get records from the app.bsky.feed.postgate collection
 * const records = await client.app.bsky.feed.postgate.getRecords();
 *
 * // Get a specific record
 * const record = await client.app.bsky.feed.postgate.getRecord({
 *   uri: 'at://did:plc:example/app.bsky.feed.postgate/3abc123'
 * });
 *
 * // Get records with filtering and search
 * const filteredRecords = await client.app.bsky.feed.postgate.getRecords({
 *   where: {
 *     text: { contains: "example search term" }
 *   }
 * });
 *
 * // Use slice-level methods for cross-collection queries with type safety
 * const sliceRecords = await client.network.slices.slice.getSliceRecords<AppBskyFeedPostgate>({
 *   where: {
 *     collection: { eq: 'app.bsky.feed.postgate' }
 *   }
 * });
 *
 * // Search across multiple collections using union types
 * const multiCollectionRecords = await client.network.slices.slice.getSliceRecords<AppBskyFeedPostgate | AppBskyActorProfile>({
 *   where: {
 *     collection: { in: ['app.bsky.feed.postgate', 'app.bsky.actor.profile'] },
 *     text: { contains: 'example search term' },
 *     did: { in: ['did:plc:user1', 'did:plc:user2'] }
 *   },
 *   limit: 20
 * });
 *
 * // Serve the records as JSON
 * Deno.serve(async () => new Response(JSON.stringify(records.records.map(r => r.value))));
 * ```
 */

import {
  type AuthProvider,
  type BlobRef,
  type CountRecordsResponse,
  type GetRecordParams,
  type GetRecordsResponse,
  type IndexedRecordFields,
  type RecordResponse,
  SlicesClient,
  type SortField,
  type WhereCondition,
} from "@slices/client";
import type { OAuthClient } from "@slices/oauth";

export type AppBskyGraphDefsListPurpose =
  | "app.bsky.graph.defs#modlist"
  | "app.bsky.graph.defs#curatelist"
  | "app.bsky.graph.defs#referencelist"
  | (string & Record<string, never>);

export type AppBskyFeedDefsEvent =
  | "app.bsky.feed.defs#requestLess"
  | "app.bsky.feed.defs#requestMore"
  | "app.bsky.feed.defs#clickthroughItem"
  | "app.bsky.feed.defs#clickthroughAuthor"
  | "app.bsky.feed.defs#clickthroughReposter"
  | "app.bsky.feed.defs#clickthroughEmbed"
  | "app.bsky.feed.defs#interactionSeen"
  | "app.bsky.feed.defs#interactionLike"
  | "app.bsky.feed.defs#interactionRepost"
  | "app.bsky.feed.defs#interactionReply"
  | "app.bsky.feed.defs#interactionQuote"
  | "app.bsky.feed.defs#interactionShare"
  | (string & Record<string, never>);

export type AppBskyFeedDefsContentMode =
  | "app.bsky.feed.defs#contentModeUnspecified"
  | "app.bsky.feed.defs#contentModeVideo"
  | (string & Record<string, never>);

export type AppBskyActorDefsActorTarget =
  | "all"
  | "exclude-following"
  | (string & Record<string, never>);

export type AppBskyActorDefsType =
  | "feed"
  | "list"
  | "timeline"
  | (string & Record<string, never>);

export type AppBskyActorDefsSort =
  | "oldest"
  | "newest"
  | "most-likes"
  | "random"
  | "hotness"
  | (string & Record<string, never>);

export type AppBskyActorDefsMutedWordTarget =
  | "content"
  | "tag"
  | (string & Record<string, never>);

export type AppBskyActorDefsVisibility =
  | "ignore"
  | "show"
  | "warn"
  | "hide"
  | (string & Record<string, never>);

export type AppBskyActorDefsAllowIncoming =
  | "all"
  | "none"
  | "following"
  | (string & Record<string, never>);

export type ComAtprotoLabelDefsLabelValue =
  | "!hide"
  | "!no-promote"
  | "!warn"
  | "!no-unauthenticated"
  | "dmca-violation"
  | "doxxing"
  | "porn"
  | "sexual"
  | "nudity"
  | "nsfl"
  | "gore"
  | (string & Record<string, never>);

export type ComAtprotoLabelDefsBlurs =
  | "content"
  | "media"
  | "none"
  | (string & Record<string, never>);

export type ComAtprotoLabelDefsSeverity =
  | "inform"
  | "alert"
  | "none"
  | (string & Record<string, never>);

export type ComAtprotoLabelDefsDefaultSetting =
  | "ignore"
  | "warn"
  | "hide"
  | (string & Record<string, never>);

export interface AppBskyEmbedDefsAspectRatio {
  width: number;
  height: number;
}

export interface AppBskyEmbedRecordMain {
  record: ComAtprotoRepoStrongRef;
}

export interface AppBskyEmbedRecordView {
  record:
    | AppBskyEmbedRecord["ViewRecord"]
    | AppBskyEmbedRecord["ViewNotFound"]
    | AppBskyEmbedRecord["ViewBlocked"]
    | AppBskyEmbedRecord["ViewDetached"]
    | AppBskyFeedDefs["GeneratorView"]
    | AppBskyGraphDefs["ListView"]
    | AppBskyLabelerDefs["LabelerView"]
    | AppBskyGraphDefs["StarterPackViewBasic"]
    | { $type: string; [key: string]: unknown };
}

export interface AppBskyEmbedRecordViewRecord {
  cid: string;
  uri: string;
  /** The record data itself. */
  value: unknown;
  author: AppBskyActorDefs["ProfileViewBasic"];
  embeds?:
    | AppBskyEmbedImages["View"]
    | AppBskyEmbedVideo["View"]
    | AppBskyEmbedExternal["View"]
    | AppBskyEmbedRecord["View"]
    | AppBskyEmbedRecordWithMedia["View"]
    | { $type: string; [key: string]: unknown }[];
  labels?: ComAtprotoLabelDefs["Label"][];
  indexedAt: string;
  likeCount?: number;
  quoteCount?: number;
  replyCount?: number;
  repostCount?: number;
}

export interface AppBskyEmbedRecordViewBlocked {
  uri: string;
  author: AppBskyFeedDefs["BlockedAuthor"];
  blocked: boolean;
}

export interface AppBskyEmbedRecordViewDetached {
  uri: string;
  detached: boolean;
}

export interface AppBskyEmbedRecordViewNotFound {
  uri: string;
  notFound: boolean;
}

export interface AppBskyEmbedImagesMain {
  images: AppBskyEmbedImages["Image"][];
}

export interface AppBskyEmbedImagesView {
  images: AppBskyEmbedImages["ViewImage"][];
}

export interface AppBskyEmbedImagesImage {
  /** Alt text description of the image, for accessibility. */
  alt: string;
  image: BlobRef;
  aspectRatio?: AppBskyEmbedDefs["AspectRatio"];
}

export interface AppBskyEmbedImagesViewImage {
  /** Alt text description of the image, for accessibility. */
  alt: string;
  /** Fully-qualified URL where a thumbnail of the image can be fetched. For example, CDN location provided by the App View. */
  thumb: string;
  /** Fully-qualified URL where a large version of the image can be fetched. May or may not be the exact original blob. For example, CDN location provided by the App View. */
  fullsize: string;
  aspectRatio?: AppBskyEmbedDefs["AspectRatio"];
}

export interface AppBskyEmbedRecordWithMediaMain {
  media:
    | AppBskyEmbedImages["Main"]
    | AppBskyEmbedVideo["Main"]
    | AppBskyEmbedExternal["Main"]
    | { $type: string; [key: string]: unknown };
  record: AppBskyEmbedRecord["Main"];
}

export interface AppBskyEmbedRecordWithMediaView {
  media:
    | AppBskyEmbedImages["View"]
    | AppBskyEmbedVideo["View"]
    | AppBskyEmbedExternal["View"]
    | { $type: string; [key: string]: unknown };
  record: AppBskyEmbedRecord["View"];
}

export interface AppBskyEmbedVideoMain {
  /** Alt text description of the video, for accessibility. */
  alt?: string;
  video: BlobRef;
  captions?: AppBskyEmbedVideo["Caption"][];
  aspectRatio?: AppBskyEmbedDefs["AspectRatio"];
}

export interface AppBskyEmbedVideoView {
  alt?: string;
  cid: string;
  playlist: string;
  thumbnail?: string;
  aspectRatio?: AppBskyEmbedDefs["AspectRatio"];
}

export interface AppBskyEmbedVideoCaption {
  file: BlobRef;
  lang: string;
}

export interface AppBskyEmbedExternalMain {
  external: AppBskyEmbedExternal["External"];
}

export interface AppBskyEmbedExternalView {
  external: AppBskyEmbedExternal["ViewExternal"];
}

export interface AppBskyEmbedExternalExternal {
  uri: string;
  thumb?: BlobRef;
  title: string;
  description: string;
}

export interface AppBskyEmbedExternalViewExternal {
  uri: string;
  thumb?: string;
  title: string;
  description: string;
}

export type AppBskyGraphDefsModlist = "app.bsky.graph.defs#modlist";

export interface AppBskyGraphDefsListView {
  cid: string;
  uri: string;
  name: string;
  avatar?: string;
  labels?: ComAtprotoLabelDefs["Label"][];
  viewer?: AppBskyGraphDefs["ListViewerState"];
  creator: AppBskyActorDefs["ProfileView"];
  purpose: AppBskyGraphDefs["ListPurpose"];
  indexedAt: string;
  description?: string;
  listItemCount?: number;
  descriptionFacets?: AppBskyRichtextFacet["Main"][];
}

export type AppBskyGraphDefsCuratelist = "app.bsky.graph.defs#curatelist";

export interface AppBskyGraphDefsListItemView {
  uri: string;
  subject: AppBskyActorDefs["ProfileView"];
}

export interface AppBskyGraphDefsRelationship {
  did: string;
  /** if the actor follows this DID, this is the AT-URI of the follow record */
  following?: string;
  /** if the actor is followed by this DID, contains the AT-URI of the follow record */
  followedBy?: string;
}

export interface AppBskyGraphDefsListViewBasic {
  cid: string;
  uri: string;
  name: string;
  avatar?: string;
  labels?: ComAtprotoLabelDefs["Label"][];
  viewer?: AppBskyGraphDefs["ListViewerState"];
  purpose: AppBskyGraphDefs["ListPurpose"];
  indexedAt?: string;
  listItemCount?: number;
}

export interface AppBskyGraphDefsNotFoundActor {
  actor: string;
  notFound: boolean;
}

export type AppBskyGraphDefsReferencelist = "app.bsky.graph.defs#referencelist";

export interface AppBskyGraphDefsListViewerState {
  muted?: boolean;
  blocked?: string;
}

export interface AppBskyGraphDefsStarterPackView {
  cid: string;
  uri: string;
  list?: AppBskyGraphDefs["ListViewBasic"];
  feeds?: AppBskyFeedDefs["GeneratorView"][];
  labels?: ComAtprotoLabelDefs["Label"][];
  record: unknown;
  creator: AppBskyActorDefs["ProfileViewBasic"];
  indexedAt: string;
  joinedWeekCount?: number;
  listItemsSample?: AppBskyGraphDefs["ListItemView"][];
  joinedAllTimeCount?: number;
}

export interface AppBskyGraphDefsStarterPackViewBasic {
  cid: string;
  uri: string;
  labels?: ComAtprotoLabelDefs["Label"][];
  record: unknown;
  creator: AppBskyActorDefs["ProfileViewBasic"];
  indexedAt: string;
  listItemCount?: number;
  joinedWeekCount?: number;
  joinedAllTimeCount?: number;
}

export interface AppBskyFeedDefsPostView {
  cid: string;
  uri: string;
  embed?:
    | AppBskyEmbedImages["View"]
    | AppBskyEmbedVideo["View"]
    | AppBskyEmbedExternal["View"]
    | AppBskyEmbedRecord["View"]
    | AppBskyEmbedRecordWithMedia["View"]
    | { $type: string; [key: string]: unknown };
  author: AppBskyActorDefs["ProfileViewBasic"];
  labels?: ComAtprotoLabelDefs["Label"][];
  record: unknown;
  viewer?: AppBskyFeedDefs["ViewerState"];
  indexedAt: string;
  likeCount?: number;
  quoteCount?: number;
  replyCount?: number;
  threadgate?: AppBskyFeedDefs["ThreadgateView"];
  repostCount?: number;
}

export interface AppBskyFeedDefsReplyRef {
  root:
    | AppBskyFeedDefs["PostView"]
    | AppBskyFeedDefs["NotFoundPost"]
    | AppBskyFeedDefs["BlockedPost"]
    | { $type: string; [key: string]: unknown };
  parent:
    | AppBskyFeedDefs["PostView"]
    | AppBskyFeedDefs["NotFoundPost"]
    | AppBskyFeedDefs["BlockedPost"]
    | { $type: string; [key: string]: unknown };
  /** When parent is a reply to another post, this is the author of that post. */
  grandparentAuthor?: AppBskyActorDefs["ProfileViewBasic"];
}

export type AppBskyFeedDefsReasonPin = Record<string, never>;

export interface AppBskyFeedDefsBlockedPost {
  uri: string;
  author: AppBskyFeedDefs["BlockedAuthor"];
  blocked: boolean;
}

export interface AppBskyFeedDefsInteraction {
  item?: string;
  event?: AppBskyFeedDefsEvent;
  /** Context on a feed item that was originally supplied by the feed generator on getFeedSkeleton. */
  feedContext?: string;
}

export type AppBskyFeedDefsRequestLess = "app.bsky.feed.defs#requestLess";
export type AppBskyFeedDefsRequestMore = "app.bsky.feed.defs#requestMore";

export interface AppBskyFeedDefsViewerState {
  like?: string;
  pinned?: boolean;
  repost?: string;
  threadMuted?: boolean;
  replyDisabled?: boolean;
  embeddingDisabled?: boolean;
}

export interface AppBskyFeedDefsFeedViewPost {
  post: AppBskyFeedDefs["PostView"];
  reply?: AppBskyFeedDefs["ReplyRef"];
  reason?: AppBskyFeedDefs["ReasonRepost"] | AppBskyFeedDefs["ReasonPin"] | {
    $type: string;
    [key: string]: unknown;
  };
  /** Context provided by feed generator that may be passed back alongside interactions. */
  feedContext?: string;
}

export interface AppBskyFeedDefsNotFoundPost {
  uri: string;
  notFound: boolean;
}

export interface AppBskyFeedDefsReasonRepost {
  by: AppBskyActorDefs["ProfileViewBasic"];
  indexedAt: string;
}

export interface AppBskyFeedDefsBlockedAuthor {
  did: string;
  viewer?: AppBskyActorDefs["ViewerState"];
}

export interface AppBskyFeedDefsGeneratorView {
  cid: string;
  did: string;
  uri: string;
  avatar?: string;
  labels?: ComAtprotoLabelDefs["Label"][];
  viewer?: AppBskyFeedDefs["GeneratorViewerState"];
  creator: AppBskyActorDefs["ProfileView"];
  indexedAt: string;
  likeCount?: number;
  contentMode?: AppBskyFeedDefsContentMode;
  description?: string;
  displayName: string;
  descriptionFacets?: AppBskyRichtextFacet["Main"][];
  acceptsInteractions?: boolean;
}

export interface AppBskyFeedDefsThreadContext {
  rootAuthorLike?: string;
}

export interface AppBskyFeedDefsThreadViewPost {
  post: AppBskyFeedDefs["PostView"];
  parent?:
    | AppBskyFeedDefs["ThreadViewPost"]
    | AppBskyFeedDefs["NotFoundPost"]
    | AppBskyFeedDefs["BlockedPost"]
    | { $type: string; [key: string]: unknown };
  replies?:
    | AppBskyFeedDefs["ThreadViewPost"]
    | AppBskyFeedDefs["NotFoundPost"]
    | AppBskyFeedDefs["BlockedPost"]
    | { $type: string; [key: string]: unknown }[];
  threadContext?: AppBskyFeedDefs["ThreadContext"];
}

export interface AppBskyFeedDefsThreadgateView {
  cid?: string;
  uri?: string;
  lists?: AppBskyGraphDefs["ListViewBasic"][];
  record?: unknown;
}

export type AppBskyFeedDefsInteractionLike =
  "app.bsky.feed.defs#interactionLike";
export type AppBskyFeedDefsInteractionSeen =
  "app.bsky.feed.defs#interactionSeen";
export type AppBskyFeedDefsClickthroughItem =
  "app.bsky.feed.defs#clickthroughItem";
export type AppBskyFeedDefsContentModeVideo =
  "app.bsky.feed.defs#contentModeVideo";
export type AppBskyFeedDefsInteractionQuote =
  "app.bsky.feed.defs#interactionQuote";
export type AppBskyFeedDefsInteractionReply =
  "app.bsky.feed.defs#interactionReply";
export type AppBskyFeedDefsInteractionShare =
  "app.bsky.feed.defs#interactionShare";

export interface AppBskyFeedDefsSkeletonFeedPost {
  post: string;
  reason?:
    | AppBskyFeedDefs["SkeletonReasonRepost"]
    | AppBskyFeedDefs["SkeletonReasonPin"]
    | { $type: string; [key: string]: unknown };
  /** Context that will be passed through to client and may be passed to feed generator back alongside interactions. */
  feedContext?: string;
}

export type AppBskyFeedDefsClickthroughEmbed =
  "app.bsky.feed.defs#clickthroughEmbed";
export type AppBskyFeedDefsInteractionRepost =
  "app.bsky.feed.defs#interactionRepost";
export type AppBskyFeedDefsSkeletonReasonPin = Record<string, never>;
export type AppBskyFeedDefsClickthroughAuthor =
  "app.bsky.feed.defs#clickthroughAuthor";
export type AppBskyFeedDefsClickthroughReposter =
  "app.bsky.feed.defs#clickthroughReposter";

export interface AppBskyFeedDefsGeneratorViewerState {
  like?: string;
}

export interface AppBskyFeedDefsSkeletonReasonRepost {
  repost: string;
}

export type AppBskyFeedDefsContentModeUnspecified =
  "app.bsky.feed.defs#contentModeUnspecified";

export interface AppBskyFeedPostgate {
  /** Reference (AT-URI) to the post record. */
  post: string;
  createdAt: string;
  /** List of rules defining who can embed this post. If value is an empty array or is undefined, no particular rules apply and anyone can embed. */
  embeddingRules?: AppBskyFeedPostgate["DisableRule"] | {
    $type: string;
    [key: string]: unknown;
  }[];
  /** List of AT-URIs embedding this post that the author has detached from. */
  detachedEmbeddingUris?: string[];
}

export type AppBskyFeedPostgateSortFields = "post" | "createdAt";
export type AppBskyFeedPostgateDisableRule = Record<string, never>;

export interface AppBskyFeedThreadgate {
  /** Reference (AT-URI) to the post record. */
  post: string;
  /** List of rules defining who can reply to this post. If value is an empty array, no one can reply. If value is undefined, anyone can reply. */
  allow?:
    | AppBskyFeedThreadgate["MentionRule"]
    | AppBskyFeedThreadgate["FollowerRule"]
    | AppBskyFeedThreadgate["FollowingRule"]
    | AppBskyFeedThreadgate["ListRule"]
    | { $type: string; [key: string]: unknown }[];
  createdAt: string;
  /** List of hidden reply URIs. */
  hiddenReplies?: string[];
}

export type AppBskyFeedThreadgateSortFields = "post" | "createdAt";

export interface AppBskyFeedThreadgateListRule {
  list: string;
}

export type AppBskyFeedThreadgateMentionRule = Record<string, never>;
export type AppBskyFeedThreadgateFollowerRule = Record<string, never>;
export type AppBskyFeedThreadgateFollowingRule = Record<string, never>;

export interface AppBskyRichtextFacetTag {
  tag: string;
}

export interface AppBskyRichtextFacetLink {
  uri: string;
}

export interface AppBskyRichtextFacetMain {
  index: AppBskyRichtextFacet["ByteSlice"];
  features:
    | AppBskyRichtextFacet["Mention"]
    | AppBskyRichtextFacet["Link"]
    | AppBskyRichtextFacet["Tag"]
    | { $type: string; [key: string]: unknown }[];
}

export interface AppBskyRichtextFacetMention {
  did: string;
}

export interface AppBskyRichtextFacetByteSlice {
  byteEnd: number;
  byteStart: number;
}

export interface AppBskyActorDefsNux {
  id: string;
  /** Arbitrary data for the NUX. The structure is defined by the NUX itself. Limited to 300 characters. */
  data?: string;
  completed: boolean;
  /** The date and time at which the NUX will expire and should be considered completed. */
  expiresAt?: string;
}

export interface AppBskyActorDefsMutedWord {
  id?: string;
  /** The muted word itself. */
  value: string;
  /** The intended targets of the muted word. */
  targets: AppBskyActorDefs["MutedWordTarget"][];
  /** The date and time at which the muted word will expire and no longer be applied. */
  expiresAt?: string;
  /** Groups of users to apply the muted word to. If undefined, applies to all users. */
  actorTarget?: AppBskyActorDefsActorTarget;
}

export interface AppBskyActorDefsSavedFeed {
  id: string;
  type: AppBskyActorDefsType;
  value: string;
  pinned: boolean;
}

export type AppBskyActorDefsPreferences =
  | AppBskyActorDefs["AdultContentPref"]
  | AppBskyActorDefs["ContentLabelPref"]
  | AppBskyActorDefs["SavedFeedsPref"]
  | AppBskyActorDefs["SavedFeedsPrefV2"]
  | AppBskyActorDefs["PersonalDetailsPref"]
  | AppBskyActorDefs["FeedViewPref"]
  | AppBskyActorDefs["ThreadViewPref"]
  | AppBskyActorDefs["InterestsPref"]
  | AppBskyActorDefs["MutedWordsPref"]
  | AppBskyActorDefs["HiddenPostsPref"]
  | AppBskyActorDefs["BskyAppStatePref"]
  | AppBskyActorDefs["LabelersPref"]
  | AppBskyActorDefs["PostInteractionSettingsPref"]
  | { $type: string; [key: string]: unknown }[];

export interface AppBskyActorDefsProfileView {
  did: string;
  avatar?: string;
  handle: string;
  labels?: ComAtprotoLabelDefs["Label"][];
  viewer?: AppBskyActorDefs["ViewerState"];
  createdAt?: string;
  indexedAt?: string;
  associated?: AppBskyActorDefs["ProfileAssociated"];
  description?: string;
  displayName?: string;
}

export interface AppBskyActorDefsViewerState {
  muted?: boolean;
  blocking?: string;
  blockedBy?: boolean;
  following?: string;
  followedBy?: string;
  mutedByList?: AppBskyGraphDefs["ListViewBasic"];
  blockingByList?: AppBskyGraphDefs["ListViewBasic"];
  knownFollowers?: AppBskyActorDefs["KnownFollowers"];
}

export interface AppBskyActorDefsFeedViewPref {
  /** The URI of the feed, or an identifier which describes the feed. */
  feed: string;
  /** Hide replies in the feed. */
  hideReplies?: boolean;
  /** Hide reposts in the feed. */
  hideReposts?: boolean;
  /** Hide quote posts in the feed. */
  hideQuotePosts?: boolean;
  /** Hide replies in the feed if they do not have this number of likes. */
  hideRepliesByLikeCount?: number;
  /** Hide replies in the feed if they are not by followed users. */
  hideRepliesByUnfollowed?: boolean;
}

export interface AppBskyActorDefsLabelersPref {
  labelers: AppBskyActorDefs["LabelerPrefItem"][];
}

export interface AppBskyActorDefsInterestsPref {
  /** A list of tags which describe the account owner's interests gathered during onboarding. */
  tags: string[];
}

export interface AppBskyActorDefsKnownFollowers {
  count: number;
  followers: AppBskyActorDefs["ProfileViewBasic"][];
}

export interface AppBskyActorDefsMutedWordsPref {
  /** A list of words the account owner has muted. */
  items: AppBskyActorDefs["MutedWord"][];
}

export interface AppBskyActorDefsSavedFeedsPref {
  saved: string[];
  pinned: string[];
  timelineIndex?: number;
}

export interface AppBskyActorDefsThreadViewPref {
  /** Sorting mode for threads. */
  sort?: AppBskyActorDefsSort;
  /** Show followed users at the top of all replies. */
  prioritizeFollowedUsers?: boolean;
}

export interface AppBskyActorDefsHiddenPostsPref {
  /** A list of URIs of posts the account owner has hidden. */
  items: string[];
}

export interface AppBskyActorDefsLabelerPrefItem {
  did: string;
}

export interface AppBskyActorDefsAdultContentPref {
  enabled: boolean;
}

export interface AppBskyActorDefsBskyAppStatePref {
  /** Storage for NUXs the user has encountered. */
  nuxs?: AppBskyActorDefs["Nux"][];
  /** An array of tokens which identify nudges (modals, popups, tours, highlight dots) that should be shown to the user. */
  queuedNudges?: string[];
  activeProgressGuide?: AppBskyActorDefs["BskyAppProgressGuide"];
}

export interface AppBskyActorDefsContentLabelPref {
  label: string;
  /** Which labeler does this preference apply to? If undefined, applies globally. */
  labelerDid?: string;
  visibility: AppBskyActorDefsVisibility;
}

export interface AppBskyActorDefsProfileViewBasic {
  did: string;
  avatar?: string;
  handle: string;
  labels?: ComAtprotoLabelDefs["Label"][];
  viewer?: AppBskyActorDefs["ViewerState"];
  createdAt?: string;
  associated?: AppBskyActorDefs["ProfileAssociated"];
  displayName?: string;
}

export interface AppBskyActorDefsSavedFeedsPrefV2 {
  items: AppBskyActorDefs["SavedFeed"][];
}

export interface AppBskyActorDefsProfileAssociated {
  chat?: AppBskyActorDefs["ProfileAssociatedChat"];
  lists?: number;
  labeler?: boolean;
  feedgens?: number;
  starterPacks?: number;
}

export interface AppBskyActorDefsPersonalDetailsPref {
  /** The birth date of account owner. */
  birthDate?: string;
}

export interface AppBskyActorDefsProfileViewDetailed {
  did: string;
  avatar?: string;
  banner?: string;
  handle: string;
  labels?: ComAtprotoLabelDefs["Label"][];
  viewer?: AppBskyActorDefs["ViewerState"];
  createdAt?: string;
  indexedAt?: string;
  associated?: AppBskyActorDefs["ProfileAssociated"];
  pinnedPost?: ComAtprotoRepoStrongRef;
  postsCount?: number;
  description?: string;
  displayName?: string;
  followsCount?: number;
  followersCount?: number;
  joinedViaStarterPack?: AppBskyGraphDefs["StarterPackViewBasic"];
}

export interface AppBskyActorDefsBskyAppProgressGuide {
  guide: string;
}

export interface AppBskyActorDefsProfileAssociatedChat {
  allowIncoming: AppBskyActorDefsAllowIncoming;
}

export interface AppBskyActorDefsPostInteractionSettingsPref {
  /** Matches threadgate record. List of rules defining who can reply to this users posts. If value is an empty array, no one can reply. If value is undefined, anyone can reply. */
  threadgateAllowRules?:
    | AppBskyFeedThreadgate["MentionRule"]
    | AppBskyFeedThreadgate["FollowerRule"]
    | AppBskyFeedThreadgate["FollowingRule"]
    | AppBskyFeedThreadgate["ListRule"]
    | { $type: string; [key: string]: unknown }[];
  /** Matches postgate record. List of rules defining who can embed this users posts. If value is an empty array or is undefined, no particular rules apply and anyone can embed. */
  postgateEmbeddingRules?: AppBskyFeedPostgate["DisableRule"] | {
    $type: string;
    [key: string]: unknown;
  }[];
}

export interface AppBskyActorProfile {
  /** Small image to be displayed next to posts from account. AKA, 'profile picture' */
  avatar?: BlobRef;
  /** Larger horizontal image to display behind profile view. */
  banner?: BlobRef;
  /** Self-label values, specific to the Bluesky application, on the overall account. */
  labels?: ComAtprotoLabelDefs["SelfLabels"] | {
    $type: string;
    [key: string]: unknown;
  };
  createdAt?: string;
  pinnedPost?: ComAtprotoRepoStrongRef;
  /** Free-form profile description text. */
  description?: string;
  displayName?: string;
  joinedViaStarterPack?: ComAtprotoRepoStrongRef;
}

export type AppBskyActorProfileSortFields =
  | "createdAt"
  | "description"
  | "displayName";

export interface AppBskyLabelerDefsLabelerView {
  cid: string;
  uri: string;
  labels?: ComAtprotoLabelDefs["Label"][];
  viewer?: AppBskyLabelerDefs["LabelerViewerState"];
  creator: AppBskyActorDefs["ProfileView"];
  indexedAt: string;
  likeCount?: number;
}

export interface AppBskyLabelerDefsLabelerPolicies {
  /** The label values which this labeler publishes. May include global or custom labels. */
  labelValues: ComAtprotoLabelDefs["LabelValue"][];
  /** Label values created by this labeler and scoped exclusively to it. Labels defined here will override global label definitions for this labeler. */
  labelValueDefinitions?: ComAtprotoLabelDefs["LabelValueDefinition"][];
}

export interface AppBskyLabelerDefsLabelerViewerState {
  like?: string;
}

export interface AppBskyLabelerDefsLabelerViewDetailed {
  cid: string;
  uri: string;
  labels?: ComAtprotoLabelDefs["Label"][];
  viewer?: AppBskyLabelerDefs["LabelerViewerState"];
  creator: AppBskyActorDefs["ProfileView"];
  policies: AppBskyLabelerDefs["LabelerPolicies"];
  indexedAt: string;
  likeCount?: number;
}

export interface ComAtprotoLabelDefsLabel {
  /** Optionally, CID specifying the specific version of 'uri' resource this label applies to. */
  cid?: string;
  /** Timestamp when this label was created. */
  cts?: string;
  /** Timestamp at which this label expires (no longer applies). */
  exp?: string;
  /** If true, this is a negation label, overwriting a previous label. */
  neg?: boolean;
  /** Signature of dag-cbor encoded label. */
  sig?: string;
  /** DID of the actor who created this label. */
  src: string;
  /** AT URI of the record, repository (account), or other resource that this label applies to. */
  uri: string;
  /** The short string name of the value or type of this label. */
  val: string;
  /** The AT Protocol version of the label object. */
  ver?: number;
}

export interface ComAtprotoLabelDefsSelfLabel {
  /** The short string name of the value or type of this label. */
  val: string;
}

export interface ComAtprotoLabelDefsSelfLabels {
  values: ComAtprotoLabelDefs["SelfLabel"][];
}

export interface ComAtprotoLabelDefsLabelValueDefinition {
  /** What should this label hide in the UI, if applied? 'content' hides all of the target; 'media' hides the images/video/audio; 'none' hides nothing. */
  blurs: ComAtprotoLabelDefsBlurs;
  locales: ComAtprotoLabelDefs["LabelValueDefinitionStrings"][];
  /** How should a client visually convey this label? 'inform' means neutral and informational; 'alert' means negative and warning; 'none' means show nothing. */
  severity: ComAtprotoLabelDefsSeverity;
  /** Does the user need to have adult content enabled in order to configure this label? */
  adultOnly?: boolean;
  /** The value of the label being defined. Must only include lowercase ascii and the '-' character ([a-z-]+). */
  identifier: string;
  /** The default setting for this label. */
  defaultSetting?: ComAtprotoLabelDefsDefaultSetting;
}

export interface ComAtprotoLabelDefsLabelValueDefinitionStrings {
  /** The code of the language these strings are written in. */
  lang: string;
  /** A short human-readable name for the label. */
  name: string;
  /** A longer description of what the label means and why it might be applied. */
  description: string;
}

export interface ComAtprotoRepoStrongRef {
  cid: string;
  uri: string;
}

export interface AppBskyEmbedDefs {
  readonly AspectRatio: AppBskyEmbedDefsAspectRatio;
}

export interface AppBskyEmbedRecord {
  readonly Main: AppBskyEmbedRecordMain;
  readonly View: AppBskyEmbedRecordView;
  readonly ViewRecord: AppBskyEmbedRecordViewRecord;
  readonly ViewBlocked: AppBskyEmbedRecordViewBlocked;
  readonly ViewDetached: AppBskyEmbedRecordViewDetached;
  readonly ViewNotFound: AppBskyEmbedRecordViewNotFound;
}

export interface AppBskyEmbedImages {
  readonly Main: AppBskyEmbedImagesMain;
  readonly View: AppBskyEmbedImagesView;
  readonly Image: AppBskyEmbedImagesImage;
  readonly ViewImage: AppBskyEmbedImagesViewImage;
}

export interface AppBskyEmbedRecordWithMedia {
  readonly Main: AppBskyEmbedRecordWithMediaMain;
  readonly View: AppBskyEmbedRecordWithMediaView;
}

export interface AppBskyEmbedVideo {
  readonly Main: AppBskyEmbedVideoMain;
  readonly View: AppBskyEmbedVideoView;
  readonly Caption: AppBskyEmbedVideoCaption;
}

export interface AppBskyEmbedExternal {
  readonly Main: AppBskyEmbedExternalMain;
  readonly View: AppBskyEmbedExternalView;
  readonly External: AppBskyEmbedExternalExternal;
  readonly ViewExternal: AppBskyEmbedExternalViewExternal;
}

export interface AppBskyGraphDefs {
  readonly Modlist: AppBskyGraphDefsModlist;
  readonly ListView: AppBskyGraphDefsListView;
  readonly Curatelist: AppBskyGraphDefsCuratelist;
  readonly ListPurpose: AppBskyGraphDefsListPurpose;
  readonly ListItemView: AppBskyGraphDefsListItemView;
  readonly Relationship: AppBskyGraphDefsRelationship;
  readonly ListViewBasic: AppBskyGraphDefsListViewBasic;
  readonly NotFoundActor: AppBskyGraphDefsNotFoundActor;
  readonly Referencelist: AppBskyGraphDefsReferencelist;
  readonly ListViewerState: AppBskyGraphDefsListViewerState;
  readonly StarterPackView: AppBskyGraphDefsStarterPackView;
  readonly StarterPackViewBasic: AppBskyGraphDefsStarterPackViewBasic;
}

export interface AppBskyFeedDefs {
  readonly PostView: AppBskyFeedDefsPostView;
  readonly ReplyRef: AppBskyFeedDefsReplyRef;
  readonly ReasonPin: AppBskyFeedDefsReasonPin;
  readonly BlockedPost: AppBskyFeedDefsBlockedPost;
  readonly Interaction: AppBskyFeedDefsInteraction;
  readonly RequestLess: AppBskyFeedDefsRequestLess;
  readonly RequestMore: AppBskyFeedDefsRequestMore;
  readonly ViewerState: AppBskyFeedDefsViewerState;
  readonly FeedViewPost: AppBskyFeedDefsFeedViewPost;
  readonly NotFoundPost: AppBskyFeedDefsNotFoundPost;
  readonly ReasonRepost: AppBskyFeedDefsReasonRepost;
  readonly BlockedAuthor: AppBskyFeedDefsBlockedAuthor;
  readonly GeneratorView: AppBskyFeedDefsGeneratorView;
  readonly ThreadContext: AppBskyFeedDefsThreadContext;
  readonly ThreadViewPost: AppBskyFeedDefsThreadViewPost;
  readonly ThreadgateView: AppBskyFeedDefsThreadgateView;
  readonly InteractionLike: AppBskyFeedDefsInteractionLike;
  readonly InteractionSeen: AppBskyFeedDefsInteractionSeen;
  readonly ClickthroughItem: AppBskyFeedDefsClickthroughItem;
  readonly ContentModeVideo: AppBskyFeedDefsContentModeVideo;
  readonly InteractionQuote: AppBskyFeedDefsInteractionQuote;
  readonly InteractionReply: AppBskyFeedDefsInteractionReply;
  readonly InteractionShare: AppBskyFeedDefsInteractionShare;
  readonly SkeletonFeedPost: AppBskyFeedDefsSkeletonFeedPost;
  readonly ClickthroughEmbed: AppBskyFeedDefsClickthroughEmbed;
  readonly InteractionRepost: AppBskyFeedDefsInteractionRepost;
  readonly SkeletonReasonPin: AppBskyFeedDefsSkeletonReasonPin;
  readonly ClickthroughAuthor: AppBskyFeedDefsClickthroughAuthor;
  readonly ClickthroughReposter: AppBskyFeedDefsClickthroughReposter;
  readonly GeneratorViewerState: AppBskyFeedDefsGeneratorViewerState;
  readonly SkeletonReasonRepost: AppBskyFeedDefsSkeletonReasonRepost;
  readonly ContentModeUnspecified: AppBskyFeedDefsContentModeUnspecified;
}

export interface AppBskyFeedPostgate {
  readonly Main: AppBskyFeedPostgate;
  readonly DisableRule: AppBskyFeedPostgateDisableRule;
}

export interface AppBskyFeedThreadgate {
  readonly Main: AppBskyFeedThreadgate;
  readonly ListRule: AppBskyFeedThreadgateListRule;
  readonly MentionRule: AppBskyFeedThreadgateMentionRule;
  readonly FollowerRule: AppBskyFeedThreadgateFollowerRule;
  readonly FollowingRule: AppBskyFeedThreadgateFollowingRule;
}

export interface AppBskyRichtextFacet {
  readonly Tag: AppBskyRichtextFacetTag;
  readonly Link: AppBskyRichtextFacetLink;
  readonly Main: AppBskyRichtextFacetMain;
  readonly Mention: AppBskyRichtextFacetMention;
  readonly ByteSlice: AppBskyRichtextFacetByteSlice;
}

export interface AppBskyActorDefs {
  readonly Nux: AppBskyActorDefsNux;
  readonly MutedWord: AppBskyActorDefsMutedWord;
  readonly SavedFeed: AppBskyActorDefsSavedFeed;
  readonly Preferences: AppBskyActorDefsPreferences;
  readonly ProfileView: AppBskyActorDefsProfileView;
  readonly ViewerState: AppBskyActorDefsViewerState;
  readonly FeedViewPref: AppBskyActorDefsFeedViewPref;
  readonly LabelersPref: AppBskyActorDefsLabelersPref;
  readonly InterestsPref: AppBskyActorDefsInterestsPref;
  readonly KnownFollowers: AppBskyActorDefsKnownFollowers;
  readonly MutedWordsPref: AppBskyActorDefsMutedWordsPref;
  readonly SavedFeedsPref: AppBskyActorDefsSavedFeedsPref;
  readonly ThreadViewPref: AppBskyActorDefsThreadViewPref;
  readonly HiddenPostsPref: AppBskyActorDefsHiddenPostsPref;
  readonly LabelerPrefItem: AppBskyActorDefsLabelerPrefItem;
  readonly MutedWordTarget: AppBskyActorDefsMutedWordTarget;
  readonly AdultContentPref: AppBskyActorDefsAdultContentPref;
  readonly BskyAppStatePref: AppBskyActorDefsBskyAppStatePref;
  readonly ContentLabelPref: AppBskyActorDefsContentLabelPref;
  readonly ProfileViewBasic: AppBskyActorDefsProfileViewBasic;
  readonly SavedFeedsPrefV2: AppBskyActorDefsSavedFeedsPrefV2;
  readonly ProfileAssociated: AppBskyActorDefsProfileAssociated;
  readonly PersonalDetailsPref: AppBskyActorDefsPersonalDetailsPref;
  readonly ProfileViewDetailed: AppBskyActorDefsProfileViewDetailed;
  readonly BskyAppProgressGuide: AppBskyActorDefsBskyAppProgressGuide;
  readonly ProfileAssociatedChat: AppBskyActorDefsProfileAssociatedChat;
  readonly PostInteractionSettingsPref:
    AppBskyActorDefsPostInteractionSettingsPref;
}

export interface AppBskyLabelerDefs {
  readonly LabelerView: AppBskyLabelerDefsLabelerView;
  readonly LabelerPolicies: AppBskyLabelerDefsLabelerPolicies;
  readonly LabelerViewerState: AppBskyLabelerDefsLabelerViewerState;
  readonly LabelerViewDetailed: AppBskyLabelerDefsLabelerViewDetailed;
}

export interface ComAtprotoLabelDefs {
  readonly Label: ComAtprotoLabelDefsLabel;
  readonly SelfLabel: ComAtprotoLabelDefsSelfLabel;
  readonly LabelValue: ComAtprotoLabelDefsLabelValue;
  readonly SelfLabels: ComAtprotoLabelDefsSelfLabels;
  readonly LabelValueDefinition: ComAtprotoLabelDefsLabelValueDefinition;
  readonly LabelValueDefinitionStrings:
    ComAtprotoLabelDefsLabelValueDefinitionStrings;
}

class PostgateFeedBskyAppClient {
  private readonly client: SlicesClient;

  constructor(client: SlicesClient) {
    this.client = client;
  }

  async getRecords(
    params?: {
      limit?: number;
      cursor?: string;
      where?: {
        [K in AppBskyFeedPostgateSortFields | IndexedRecordFields]?:
          WhereCondition;
      };
      orWhere?: {
        [K in AppBskyFeedPostgateSortFields | IndexedRecordFields]?:
          WhereCondition;
      };
      sortBy?: SortField<AppBskyFeedPostgateSortFields>[];
    },
  ): Promise<GetRecordsResponse<AppBskyFeedPostgate>> {
    return await this.client.getRecords("app.bsky.feed.postgate", params);
  }

  async getRecord(
    params: GetRecordParams,
  ): Promise<RecordResponse<AppBskyFeedPostgate>> {
    return await this.client.getRecord("app.bsky.feed.postgate", params);
  }

  async countRecords(
    params?: {
      limit?: number;
      cursor?: string;
      where?: {
        [K in AppBskyFeedPostgateSortFields | IndexedRecordFields]?:
          WhereCondition;
      };
      orWhere?: {
        [K in AppBskyFeedPostgateSortFields | IndexedRecordFields]?:
          WhereCondition;
      };
      sortBy?: SortField<AppBskyFeedPostgateSortFields>[];
    },
  ): Promise<CountRecordsResponse> {
    return await this.client.countRecords("app.bsky.feed.postgate", params);
  }

  async createRecord(
    record: AppBskyFeedPostgate,
    useSelfRkey?: boolean,
  ): Promise<{ uri: string; cid: string }> {
    return await this.client.createRecord(
      "app.bsky.feed.postgate",
      record,
      useSelfRkey,
    );
  }

  async updateRecord(
    rkey: string,
    record: AppBskyFeedPostgate,
  ): Promise<{ uri: string; cid: string }> {
    return await this.client.updateRecord(
      "app.bsky.feed.postgate",
      rkey,
      record,
    );
  }

  async deleteRecord(rkey: string): Promise<void> {
    return await this.client.deleteRecord("app.bsky.feed.postgate", rkey);
  }
}

class ThreadgateFeedBskyAppClient {
  private readonly client: SlicesClient;

  constructor(client: SlicesClient) {
    this.client = client;
  }

  async getRecords(
    params?: {
      limit?: number;
      cursor?: string;
      where?: {
        [K in AppBskyFeedThreadgateSortFields | IndexedRecordFields]?:
          WhereCondition;
      };
      orWhere?: {
        [K in AppBskyFeedThreadgateSortFields | IndexedRecordFields]?:
          WhereCondition;
      };
      sortBy?: SortField<AppBskyFeedThreadgateSortFields>[];
    },
  ): Promise<GetRecordsResponse<AppBskyFeedThreadgate>> {
    return await this.client.getRecords("app.bsky.feed.threadgate", params);
  }

  async getRecord(
    params: GetRecordParams,
  ): Promise<RecordResponse<AppBskyFeedThreadgate>> {
    return await this.client.getRecord("app.bsky.feed.threadgate", params);
  }

  async countRecords(
    params?: {
      limit?: number;
      cursor?: string;
      where?: {
        [K in AppBskyFeedThreadgateSortFields | IndexedRecordFields]?:
          WhereCondition;
      };
      orWhere?: {
        [K in AppBskyFeedThreadgateSortFields | IndexedRecordFields]?:
          WhereCondition;
      };
      sortBy?: SortField<AppBskyFeedThreadgateSortFields>[];
    },
  ): Promise<CountRecordsResponse> {
    return await this.client.countRecords("app.bsky.feed.threadgate", params);
  }

  async createRecord(
    record: AppBskyFeedThreadgate,
    useSelfRkey?: boolean,
  ): Promise<{ uri: string; cid: string }> {
    return await this.client.createRecord(
      "app.bsky.feed.threadgate",
      record,
      useSelfRkey,
    );
  }

  async updateRecord(
    rkey: string,
    record: AppBskyFeedThreadgate,
  ): Promise<{ uri: string; cid: string }> {
    return await this.client.updateRecord(
      "app.bsky.feed.threadgate",
      rkey,
      record,
    );
  }

  async deleteRecord(rkey: string): Promise<void> {
    return await this.client.deleteRecord("app.bsky.feed.threadgate", rkey);
  }
}

class FeedBskyAppClient {
  readonly postgate: PostgateFeedBskyAppClient;
  readonly threadgate: ThreadgateFeedBskyAppClient;
  private readonly client: SlicesClient;

  constructor(client: SlicesClient) {
    this.client = client;
    this.postgate = new PostgateFeedBskyAppClient(client);
    this.threadgate = new ThreadgateFeedBskyAppClient(client);
  }
}

class ProfileActorBskyAppClient {
  private readonly client: SlicesClient;

  constructor(client: SlicesClient) {
    this.client = client;
  }

  async getRecords(
    params?: {
      limit?: number;
      cursor?: string;
      where?: {
        [K in AppBskyActorProfileSortFields | IndexedRecordFields]?:
          WhereCondition;
      };
      orWhere?: {
        [K in AppBskyActorProfileSortFields | IndexedRecordFields]?:
          WhereCondition;
      };
      sortBy?: SortField<AppBskyActorProfileSortFields>[];
    },
  ): Promise<GetRecordsResponse<AppBskyActorProfile>> {
    return await this.client.getRecords("app.bsky.actor.profile", params);
  }

  async getRecord(
    params: GetRecordParams,
  ): Promise<RecordResponse<AppBskyActorProfile>> {
    return await this.client.getRecord("app.bsky.actor.profile", params);
  }

  async countRecords(
    params?: {
      limit?: number;
      cursor?: string;
      where?: {
        [K in AppBskyActorProfileSortFields | IndexedRecordFields]?:
          WhereCondition;
      };
      orWhere?: {
        [K in AppBskyActorProfileSortFields | IndexedRecordFields]?:
          WhereCondition;
      };
      sortBy?: SortField<AppBskyActorProfileSortFields>[];
    },
  ): Promise<CountRecordsResponse> {
    return await this.client.countRecords("app.bsky.actor.profile", params);
  }

  async createRecord(
    record: AppBskyActorProfile,
    useSelfRkey?: boolean,
  ): Promise<{ uri: string; cid: string }> {
    return await this.client.createRecord(
      "app.bsky.actor.profile",
      record,
      useSelfRkey,
    );
  }

  async updateRecord(
    rkey: string,
    record: AppBskyActorProfile,
  ): Promise<{ uri: string; cid: string }> {
    return await this.client.updateRecord(
      "app.bsky.actor.profile",
      rkey,
      record,
    );
  }

  async deleteRecord(rkey: string): Promise<void> {
    return await this.client.deleteRecord("app.bsky.actor.profile", rkey);
  }
}

class ActorBskyAppClient {
  readonly profile: ProfileActorBskyAppClient;
  private readonly client: SlicesClient;

  constructor(client: SlicesClient) {
    this.client = client;
    this.profile = new ProfileActorBskyAppClient(client);
  }
}

class BskyAppClient {
  readonly feed: FeedBskyAppClient;
  readonly actor: ActorBskyAppClient;
  private readonly client: SlicesClient;

  constructor(client: SlicesClient) {
    this.client = client;
    this.feed = new FeedBskyAppClient(client);
    this.actor = new ActorBskyAppClient(client);
  }
}

class AppClient {
  readonly bsky: BskyAppClient;
  private readonly client: SlicesClient;

  constructor(client: SlicesClient) {
    this.client = client;
    this.bsky = new BskyAppClient(client);
  }
}

export class AtProtoClient extends SlicesClient {
  readonly app: AppClient;
  readonly oauth?: OAuthClient | AuthProvider;

  constructor(
    baseUrl: string,
    sliceUri: string,
    oauthClient?: OAuthClient | AuthProvider,
  ) {
    super(baseUrl, sliceUri, oauthClient);
    this.app = new AppClient(this);
    this.oauth = oauthClient;
  }
}
