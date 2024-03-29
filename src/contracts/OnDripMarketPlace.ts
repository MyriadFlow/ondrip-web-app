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

export interface OnDripMarketPlaceInterface extends utils.Interface {
  functions: {
    "createMarketItem(address,uint256,uint256)": FunctionFragment;
    "createMarketSale(uint256)": FunctionFragment;
    "idToMarketItem(uint256)": FunctionFragment;
    "owner()": FunctionFragment;
    "platformFeeBasisPoint()": FunctionFragment;
    "removeFromSale(uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "createMarketItem"
      | "createMarketSale"
      | "idToMarketItem"
      | "owner"
      | "platformFeeBasisPoint"
      | "removeFromSale"
  ): FunctionFragment;

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

  decodeFunctionResult(
    functionFragment: "createMarketItem",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createMarketSale",
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

  events: {
    "MarketItemCreated(uint256,address,uint256,string,address,address,uint256,bool)": EventFragment;
    "MarketItemRemoved(uint256)": EventFragment;
    "MarketItemSold(uint256,uint256,address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "MarketItemCreated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "MarketItemRemoved"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "MarketItemSold"): EventFragment;
}

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

export interface OnDripMarketPlace extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: OnDripMarketPlaceInterface;

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
  };

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

  callStatic: {
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
  };

  filters: {
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
  };

  estimateGas: {
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
  };

  populateTransaction: {
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
  };
}
