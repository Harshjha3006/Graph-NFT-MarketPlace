import { BigInt,Address } from "@graphprotocol/graph-ts"
import {
  ItemBought as ItemBoughtEvent,
  ItemCancelled as ItemCancelledEvent,
  ItemListed as ItemListedEvent
} from "../generated/NftMarketPlace/NftMarketPlace"
import { ItemBought, ItemCancelled, ItemListed,ActiveItem } from "../generated/schema"
// event.transaction.hash.concatI32(event.logIndex.toI32())

export function handleItemBought(event: ItemBoughtEvent): void {
  let itemBought = ItemBought.load(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  let activeItem = ActiveItem.load(
  event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  if (!itemBought) {
      itemBought = new ItemBought(
        event.transaction.hash.concatI32(event.logIndex.toI32())
      )
  }
  itemBought.buyer = event.params.buyer
  itemBought.nftAddress = event.params.nftAddress
  itemBought.tokenId = event.params.tokenId
  activeItem!.buyer = event.params.buyer

  itemBought.save()
  activeItem!.save()
}

export function handleItemCancelled(event: ItemCancelledEvent): void {
  let itemCanceled = ItemCancelled.load(
    event.transaction.hash.concatI32(event.logIndex.toI32())
   
  )
  let activeItem = ActiveItem.load(
  event.transaction.hash.concatI32(event.logIndex.toI32())

  ) 
  if (!itemCanceled) {
      itemCanceled = new ItemCancelled(
        event.transaction.hash.concatI32(event.logIndex.toI32())

      )
  }
  itemCanceled.seller = event.params.seller
  itemCanceled.nftAddress = event.params.nftAddress
  itemCanceled.tokenId = event.params.tokenId
  activeItem!.buyer = Address.fromString("0x000000000000000000000000000000000000dEaD")

  itemCanceled.save()
  activeItem!.save()
}

export function handleItemListed(event: ItemListedEvent): void {
  let itemListed = ItemListed.load(
    event.transaction.hash.concatI32(event.logIndex.toI32())

  )
  let activeItem = ActiveItem.load(
    event.transaction.hash.concatI32(event.logIndex.toI32())

  )
  if (!itemListed) {
     itemListed = new ItemListed(
        event.transaction.hash.concatI32(event.logIndex.toI32())

      )
  }
  if (!activeItem) {
      activeItem = new ActiveItem(
        event.transaction.hash.concatI32(event.logIndex.toI32())

      )
  }
  itemListed.seller = event.params.seller
  activeItem.seller = event.params.seller

  itemListed.nftAddress = event.params.nftAddress
  activeItem.nftAddress = event.params.nftAddress

  itemListed.tokenId = event.params.tokenId
  activeItem.tokenId = event.params.tokenId

  itemListed.price = event.params.price
  activeItem.price = event.params.price

  activeItem.buyer = Address.fromString("0x0000000000000000000000000000000000000000")

  itemListed.save()
  activeItem.save()
}