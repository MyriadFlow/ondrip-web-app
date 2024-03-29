/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "./common";

export interface OnDripMarketInterface extends utils.Interface {
  functions: {
    "bid(uint256)": FunctionFragment;
    "bids(address)": FunctionFragment;
    "createAuctionItem(address,uint256,uint256,uint256)": FunctionFragment;
    "createMarketItem(address,uint256,uint256)": FunctionFragment;
    "createMarketSale(uint256)": FunctionFragment;
    "end(uint256)": FunctionFragment;
    "idToAuctionItem(uint256)": FunctionFragment;
    "idToMarketItem(uint256)": FunctionFragment;
    "owner()": FunctionFragment;
    "platformFeeBasisPoint()": FunctionFragment;
    "removeFromSale(uint256)": FunctionFragment;
    "withdraw()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "bid"
      | "bids"
      | "createAuctionItem"
      | "createMarketItem"
      | "createMarketSale"
      | "end"
      | "idToAuctionItem"
      | "idToMarketItem"
      | "owner"
      | "platformFeeBasisPoint"
      | "removeFromSale"
      | "withdraw"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "bid",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "bids",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "createAuctionItem",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "createMarketItem",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "createMarketSale",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "end",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "idToAuctionItem",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "idToMarketItem",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "platformFeeBasisPoint",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "removeFromSale",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: "withdraw", values?: undefined): string;

  decodeFunctionResult(functionFragment: "bid", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "bids", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "createAuctionItem",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createMarketItem",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createMarketSale",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "end", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "idToAuctionItem",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "idToMarketItem",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "platformFeeBasisPoint",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "removeFromSale",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;

  events: {
    "AuctionItemCreated(uint256,address,uint256,string,address,address,address,uint256,uint256,bool,bool)": EventFragment;
    "AuctionItemSold(uint256,address,uint256,address,uint256)": EventFragment;
    "Bid(address,uint256,uint256)": EventFragment;
    "MarketItemCreated(uint256,address,uint256,string,address,address,uint256,bool)": EventFragment;
    "MarketItemRemoved(uint256)": EventFragment;
    "MarketItemSold(uint256,uint256,address,uint256)": EventFragment;
    "Start()": EventFragment;
    "Withdraw(address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "AuctionItemCreated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "AuctionItemSold"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Bid"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "MarketItemCreated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "MarketItemRemoved"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "MarketItemSold"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Start"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Withdraw"): EventFragment;
}

export interface AuctionItemCreatedEventObject {
  itemId: BigNumber;
  nftContract: string;
  tokenId: BigNumber;
  metaDataURI: string;
  seller: string;
  highestBidder: string;
  owner: string;
  highestBid: BigNumber;
  endAt: BigNumber;
  started: boolean;
  ended: boolean;
}
export type AuctionItemCreatedEvent = TypedEvent<
  [
    BigNumber,
    string,
    BigNumber,
    string,
    string,
    string,
    string,
    BigNumber,
    BigNumber,
    boolean,
    boolean
  ],
  AuctionItemCreatedEventObject
>;

export type AuctionItemCreatedEventFilter =
  TypedEventFilter<AuctionItemCreatedEvent>;

export interface AuctionItemSoldEventObject {
  itemId: BigNumber;
  nftContract: string;
  tokenId: BigNumber;
  winner: string;
  highestBid: BigNumber;
}
export type AuctionItemSoldEvent = TypedEvent<
  [BigNumber, string, BigNumber, string, BigNumber],
  AuctionItemSoldEventObject
>;

export type AuctionItemSoldEventFilter = TypedEventFilter<AuctionItemSoldEvent>;

export interface BidEventObject {
  sender: string;
  itemid: BigNumber;
  amount: BigNumber;
}
export type BidEvent = TypedEvent<
  [string, BigNumber, BigNumber],
  BidEventObject
>;

export type BidEventFilter = TypedEventFilter<BidEvent>;

export interface MarketItemCreatedEventObject {
  itemId: BigNumber;
  nftContract: string;
  tokenId: BigNumber;
  metaDataURI: string;
  seller: string;
  owner: string;
  price: BigNumber;
  forSale: boolean;
}
export type MarketItemCreatedEvent = TypedEvent<
  [BigNumber, string, BigNumber, string, string, string, BigNumber, boolean],
  MarketItemCreatedEventObject
>;

export type MarketItemCreatedEventFilter =
  TypedEventFilter<MarketItemCreatedEvent>;

export interface MarketItemRemovedEventObject {
  itemId: BigNumber;
}
export type MarketItemRemovedEvent = TypedEvent<
  [BigNumber],
  MarketItemRemovedEventObject
>;

export type MarketItemRemovedEventFilter =
  TypedEventFilter<MarketItemRemovedEvent>;

export interface MarketItemSoldEventObject {
  itemId: BigNumber;
  tokenId: BigNumber;
  buyer: string;
  price: BigNumber;
}
export type MarketItemSoldEvent = TypedEvent<
  [BigNumber, BigNumber, string, BigNumber],
  MarketItemSoldEventObject
>;

export type MarketItemSoldEventFilter = TypedEventFilter<MarketItemSoldEvent>;

export interface StartEventObject {}
export type StartEvent = TypedEvent<[], StartEventObject>;

export type StartEventFilter = TypedEventFilter<StartEvent>;

export interface WithdrawEventObject {
  bidder: string;
  amount: BigNumber;
}
export type WithdrawEvent = TypedEvent<
  [string, BigNumber],
  WithdrawEventObject
>;

export type WithdrawEventFilter = TypedEventFilter<WithdrawEvent>;

export interface OnDripMarket extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: OnDripMarketInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    bid(
      _itemId: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    bids(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    createAuctionItem(
      nftContract: PromiseOrValue<string>,
      tokenId: PromiseOrValue<BigNumberish>,
      highestBid: PromiseOrValue<BigNumberish>,
      endTime: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    createMarketItem(
      nftContract: PromiseOrValue<string>,
      tokenId: PromiseOrValue<BigNumberish>,
      price: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    createMarketSale(
      itemId: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    end(
      _itemId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    idToAuctionItem(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [
        BigNumber,
        string,
        BigNumber,
        string,
        string,
        string,
        BigNumber,
        BigNumber,
        boolean,
        boolean
      ] & {
        itemId: BigNumber;
        nftContract: string;
        tokenId: BigNumber;
        seller: string;
        highestBidder: string;
        owner: string;
        highestBid: BigNumber;
        endAt: BigNumber;
        started: boolean;
        ended: boolean;
      }
    >;

    idToMarketItem(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [
        BigNumber,
        string,
        BigNumber,
        string,
        string,
        BigNumber,
        boolean,
        boolean
      ] & {
        itemId: BigNumber;
        nftContract: string;
        tokenId: BigNumber;
        seller: string;
        owner: string;
        price: BigNumber;
        forSale: boolean;
        deleted: boolean;
      }
    >;

    owner(overrides?: CallOverrides): Promise<[string]>;

    platformFeeBasisPoint(overrides?: CallOverrides): Promise<[BigNumber]>;

    removeFromSale(
      itemId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    withdraw(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  bid(
    _itemId: PromiseOrValue<BigNumberish>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  bids(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  createAuctionItem(
    nftContract: PromiseOrValue<string>,
    tokenId: PromiseOrValue<BigNumberish>,
    highestBid: PromiseOrValue<BigNumberish>,
    endTime: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  createMarketItem(
    nftContract: PromiseOrValue<string>,
    tokenId: PromiseOrValue<BigNumberish>,
    price: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  createMarketSale(
    itemId: PromiseOrValue<BigNumberish>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  end(
    _itemId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  idToAuctionItem(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<
    [
      BigNumber,
      string,
      BigNumber,
      string,
      string,
      string,
      BigNumber,
      BigNumber,
      boolean,
      boolean
    ] & {
      itemId: BigNumber;
      nftContract: string;
      tokenId: BigNumber;
      seller: string;
      highestBidder: string;
      owner: string;
      highestBid: BigNumber;
      endAt: BigNumber;
      started: boolean;
      ended: boolean;
    }
  >;

  idToMarketItem(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<
    [
      BigNumber,
      string,
      BigNumber,
      string,
      string,
      BigNumber,
      boolean,
      boolean
    ] & {
      itemId: BigNumber;
      nftContract: string;
      tokenId: BigNumber;
      seller: string;
      owner: string;
      price: BigNumber;
      forSale: boolean;
      deleted: boolean;
    }
  >;

  owner(overrides?: CallOverrides): Promise<string>;

  platformFeeBasisPoint(overrides?: CallOverrides): Promise<BigNumber>;

  removeFromSale(
    itemId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  withdraw(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    bid(
      _itemId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    bids(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    createAuctionItem(
      nftContract: PromiseOrValue<string>,
      tokenId: PromiseOrValue<BigNumberish>,
      highestBid: PromiseOrValue<BigNumberish>,
      endTime: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    createMarketItem(
      nftContract: PromiseOrValue<string>,
      tokenId: PromiseOrValue<BigNumberish>,
      price: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    createMarketSale(
      itemId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    end(
      _itemId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    idToAuctionItem(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [
        BigNumber,
        string,
        BigNumber,
        string,
        string,
        string,
        BigNumber,
        BigNumber,
        boolean,
        boolean
      ] & {
        itemId: BigNumber;
        nftContract: string;
        tokenId: BigNumber;
        seller: string;
        highestBidder: string;
        owner: string;
        highestBid: BigNumber;
        endAt: BigNumber;
        started: boolean;
        ended: boolean;
      }
    >;

    idToMarketItem(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [
        BigNumber,
        string,
        BigNumber,
        string,
        string,
        BigNumber,
        boolean,
        boolean
      ] & {
        itemId: BigNumber;
        nftContract: string;
        tokenId: BigNumber;
        seller: string;
        owner: string;
        price: BigNumber;
        forSale: boolean;
        deleted: boolean;
      }
    >;

    owner(overrides?: CallOverrides): Promise<string>;

    platformFeeBasisPoint(overrides?: CallOverrides): Promise<BigNumber>;

    removeFromSale(
      itemId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    withdraw(overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    "AuctionItemCreated(uint256,address,uint256,string,address,address,address,uint256,uint256,bool,bool)"(
      itemId?: PromiseOrValue<BigNumberish> | null,
      nftContract?: PromiseOrValue<string> | null,
      tokenId?: PromiseOrValue<BigNumberish> | null,
      metaDataURI?: null,
      seller?: null,
      highestBidder?: null,
      owner?: null,
      highestBid?: null,
      endAt?: null,
      started?: null,
      ended?: null
    ): AuctionItemCreatedEventFilter;
    AuctionItemCreated(
      itemId?: PromiseOrValue<BigNumberish> | null,
      nftContract?: PromiseOrValue<string> | null,
      tokenId?: PromiseOrValue<BigNumberish> | null,
      metaDataURI?: null,
      seller?: null,
      highestBidder?: null,
      owner?: null,
      highestBid?: null,
      endAt?: null,
      started?: null,
      ended?: null
    ): AuctionItemCreatedEventFilter;

    "AuctionItemSold(uint256,address,uint256,address,uint256)"(
      itemId?: PromiseOrValue<BigNumberish> | null,
      nftContract?: PromiseOrValue<string> | null,
      tokenId?: PromiseOrValue<BigNumberish> | null,
      winner?: null,
      highestBid?: null
    ): AuctionItemSoldEventFilter;
    AuctionItemSold(
      itemId?: PromiseOrValue<BigNumberish> | null,
      nftContract?: PromiseOrValue<string> | null,
      tokenId?: PromiseOrValue<BigNumberish> | null,
      winner?: null,
      highestBid?: null
    ): AuctionItemSoldEventFilter;

    "Bid(address,uint256,uint256)"(
      sender?: PromiseOrValue<string> | null,
      itemid?: null,
      amount?: null
    ): BidEventFilter;
    Bid(
      sender?: PromiseOrValue<string> | null,
      itemid?: null,
      amount?: null
    ): BidEventFilter;

    "MarketItemCreated(uint256,address,uint256,string,address,address,uint256,bool)"(
      itemId?: PromiseOrValue<BigNumberish> | null,
      nftContract?: PromiseOrValue<string> | null,
      tokenId?: PromiseOrValue<BigNumberish> | null,
      metaDataURI?: null,
      seller?: null,
      owner?: null,
      price?: null,
      forSale?: null
    ): MarketItemCreatedEventFilter;
    MarketItemCreated(
      itemId?: PromiseOrValue<BigNumberish> | null,
      nftContract?: PromiseOrValue<string> | null,
      tokenId?: PromiseOrValue<BigNumberish> | null,
      metaDataURI?: null,
      seller?: null,
      owner?: null,
      price?: null,
      forSale?: null
    ): MarketItemCreatedEventFilter;

    "MarketItemRemoved(uint256)"(itemId?: null): MarketItemRemovedEventFilter;
    MarketItemRemoved(itemId?: null): MarketItemRemovedEventFilter;

    "MarketItemSold(uint256,uint256,address,uint256)"(
      itemId?: PromiseOrValue<BigNumberish> | null,
      tokenId?: PromiseOrValue<BigNumberish> | null,
      buyer?: null,
      price?: null
    ): MarketItemSoldEventFilter;
    MarketItemSold(
      itemId?: PromiseOrValue<BigNumberish> | null,
      tokenId?: PromiseOrValue<BigNumberish> | null,
      buyer?: null,
      price?: null
    ): MarketItemSoldEventFilter;

    "Start()"(): StartEventFilter;
    Start(): StartEventFilter;

    "Withdraw(address,uint256)"(
      bidder?: PromiseOrValue<string> | null,
      amount?: null
    ): WithdrawEventFilter;
    Withdraw(
      bidder?: PromiseOrValue<string> | null,
      amount?: null
    ): WithdrawEventFilter;
  };

  estimateGas: {
    bid(
      _itemId: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    bids(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    createAuctionItem(
      nftContract: PromiseOrValue<string>,
      tokenId: PromiseOrValue<BigNumberish>,
      highestBid: PromiseOrValue<BigNumberish>,
      endTime: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    createMarketItem(
      nftContract: PromiseOrValue<string>,
      tokenId: PromiseOrValue<BigNumberish>,
      price: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    createMarketSale(
      itemId: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    end(
      _itemId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    idToAuctionItem(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    idToMarketItem(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    platformFeeBasisPoint(overrides?: CallOverrides): Promise<BigNumber>;

    removeFromSale(
      itemId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    withdraw(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    bid(
      _itemId: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    bids(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    createAuctionItem(
      nftContract: PromiseOrValue<string>,
      tokenId: PromiseOrValue<BigNumberish>,
      highestBid: PromiseOrValue<BigNumberish>,
      endTime: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    createMarketItem(
      nftContract: PromiseOrValue<string>,
      tokenId: PromiseOrValue<BigNumberish>,
      price: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    createMarketSale(
      itemId: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    end(
      _itemId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    idToAuctionItem(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    idToMarketItem(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    platformFeeBasisPoint(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    removeFromSale(
      itemId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    withdraw(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
